import React, {useEffect, useState} from 'react';
import {EditorState, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import {convertToHTML} from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../App.css';
import {createPostAction, listPostDetails} from '../Actions/postActions'
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {RESET_READ_POSTS} from "../Constants/postConstants";

const App = ({ location, history,match }) => {

    const postDetails = useSelector((state) => state.postDetails)
    const { loading,error, success, post } = postDetails

    const post_id = match.params.id




    const postUpdate = useSelector((state) => state.postUpdate)


    const dispatch = useDispatch()
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [show, setShow] =useState(true)
    const [convertedContent, setConvertedContent] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch({type:RESET_READ_POSTS})
        dispatch(listPostDetails(post_id))




    }, [dispatch])


    const startEdit = () => {
        setEdit(true)
        setShow(false)
        setConvertedContent(dataPosts.resume)
        const blocksFromHtml = htmlToDraft(dataPosts.resume);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const b = EditorState.createWithContent(contentState);
        setEditorState(b)
    }


    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }


    const submitHandler = () => {

        dispatch(saveData({resume: convertedContent}, 'resume'))
        const blocksFromHtml = htmlToDraft(convertedContent);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const b = EditorState.createWithContent(contentState);
        setEditorState(b)

    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) => {

        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className="App">

            { loading && <Loader/> }
            {edit &&
            <>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
                {loading && <Loader/>}
                {success && <Message variant='success'>Successfully saved!</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Button onClick={submitHandler}>SAVE </Button>
            </>
            }

        </div>
    )
}

export default App;