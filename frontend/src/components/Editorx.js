import React, {useEffect, useState} from 'react';
import {EditorState, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import {convertToHTML} from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../App.css';
import {saveData, getData} from '../Actions/postActions'
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {POST_GET_RESET} from "../Constants/postConstants";

const App = () => {

    const posts = useSelector((state) => state.posts)
    const {loading, error, success, data} = posts
    const getPosts = useSelector((state) => state.getPost)
    const {loadingPosts, errorPosts, successPosts, dataPosts, reset} = getPosts
    const dispatch = useDispatch()
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [show, setShow] =useState(true)
    const [convertedContent, setConvertedContent] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch({type:POST_GET_RESET})
        dispatch(getData('resume'))




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

            {loadingPosts || loading && <Loader/> }
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
            {show && successPosts &&
            <div className="preview" dangerouslySetInnerHTML={createMarkup(dataPosts.resume)}></div>

            }

            <Button onClick={startEdit} className="App-header">
                Edit your resume
            </Button>
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