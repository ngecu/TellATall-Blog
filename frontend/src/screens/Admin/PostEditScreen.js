import axios from 'axios'
import React, {useState, useEffect, useRef,useMemo,useCallback  } from 'react'


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import  {listPostDetails} from '../../actions/postActions'
import FormContainer from '../../components/FormContainer'
import { updatePost} from '../../actions/postActions'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Jodit from "jodit";
import "jodit/build/jodit.min.css";
import { RESET_UPDATE_POSTS } from '../../constants/postConstants'
import {Markup} from "interweave";
import Tag from "../../components/Tag";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const PostEditScreen = ({ location, history,match }) => {

    const post_id = match.params.id

    const [text, settext] = useState('')
    const [title, settitle] = useState('')
    const [uploading,setUploading]= useState(false)
    const [description,setdescription]= useState('')
    const [loadingStatus,setLoadingStatus]=useState(true)
    const [photo, setphoto] = useState('')
    const [author, setAuthor] = useState('')
    const [ ErrorStatus, setErrorStatus] = useState('')
    const dispatch = useDispatch()

    const postDetails = useSelector((state) => state.postDetails)




    const postUpdate = useSelector((state) => state.postUpdate)
   
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdatePosts,
    } = postUpdate


    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        buttons: [ "bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "center", "left", "right", "justify", "|", "link", "image"],
        uploader: { insertImageAsBase64URI: true },
        removeButtons: ["brush", "file"],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: false
    }


    const notify = () => toast.success('🦄 Post Upated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;
    




    useEffect(()=>{
        if(postDetails){
           const {post,error,loading} = postDetails

           if (loading) {
               setLoadingStatus(true)
           }
           if (!loading) {
            setLoadingStatus(false)
               
           }
           if (error) {
            setErrorStatus(error)
               
           }
            settitle(post.title)
            settext(post.text)
            setdescription(post.description)
            setphoto(post.photo)
        }
    },[postDetails,settext])


    useEffect(() => {
        if (successUpdatePosts){
            dispatch({ type: RESET_UPDATE_POSTS })
            history.push('/admin/postlist')
            console.log("succesffult updated")
        }
        else{
                dispatch(listPostDetails(post_id))
        }

    }, [])

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]


        const formData = new FormData()
        formData.append('image', file)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setphoto(data)

            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

   const updateContent = (value) => {
       console.log("text is ",value)
        settext(value)
        
    }
    

    const s = {
        _id:post_id,title,photo,description,text
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePost(s))
        notify()
    }
    return (
        <>
         <ToastContainer
        
        position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        <Row  >
            {loadingStatus ? (
                <Loader/>
            ):ErrorStatus? (
                <Col xs={6} md={6}>
        <Message variant='danger'>{ErrorStatus}</Message>
        </Col>
            ): (
<Col xs={6} md={6}>
                <h1>Update Post</h1>
                <FormContainer style={{width: "100%"}}>


                    <Form style={{width: "100%"}} onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Title'
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Title'
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>



                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.File id='image-file' label='Choose File'
                                       custom
                                       onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader/>}


                        </Form.Group>
                
                        {/* <Editor value={text} /> */}

                        {/* <JoditEditor
      value={text}
      ref={editor}
      config={config}
      onChange={content => setContent(content)}
    /> */}


<CKEditor
                    editor={ ClassicEditor }
                    data={text}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        settext(data)
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />


                        <Button type='submit' variant='primary'>
                            UPDATE
                        </Button>
                    </Form>


                </FormContainer>
            </Col>
            )}

{loadingStatus ? (
                <Loader/>
            ):ErrorStatus? (
                <Col xs={6} md={6}>
                <Message variant='danger'>{ErrorStatus}</Message>
                </Col>
            ): (
            <Col xs={6} md={6}>
                <Row>
                    <Col md={2} xs={12}>
                        <div className="share">
                            <p>
                                Share
                            </p>

                            <div className="sep">
                            </div>
                            <p>
                                Talk
                            </p>
                            <ul>
                                <li>
                                    <a href="#comments">
                                        42<br/>
                                        <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path
                                                d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col md={8} xs={12} className="col-md-offset-2">
                        <Col className="mainheading">
                            <h1 className="posttitle">{title}</h1>

                        </Col>


                        <img className="featured-image img-fluid" src={photo} alt=""/>
                        <h4 className="card-text">{description}</h4>
                        <div className="article-post">
                            <Markup content={text} />
                        </div>

                        <div className="after-post-tags">

                        </div>


                    </Col>
                </Row>
            </Col>
            )}
        </Row>
    </>
    )
}



export default PostEditScreen
