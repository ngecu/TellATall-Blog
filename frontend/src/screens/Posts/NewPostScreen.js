import axios from 'axios'
import React, {useState, useEffect, useRef,useMemo,useCallback  } from 'react'
// import Editor from '../../components/Editor'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import FormContainer from '../../components/FormContainer'
import { createPostAction } from '../../actions/postActions'
import { getTagsAction } from '../../actions/tagActions'

import JoditEditor from "jodit-react";

import {RESET_CREATE_POSTS} from '../../constants/postConstants'
import {Markup} from "interweave";
import Tag from "../../components/Tag";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewPostScreen = ({ location, history }) => {
    const [text, settext] = useState('')
    const [title, settitle] = useState('')
    const [uploading,setUploading]= useState(false)
    const [photo, setphoto] = useState('')
    const [tag, setTag] = useState([])
    const [description, setdescription] = useState('')
    const [showA, setShowA] = useState(true);
    const [position, setPosition] = useState('top-start');


    const postCreate = useSelector((state) => state.postCreate)
    const readTags = useSelector((state)=>state.readTags)

    const {tags} = readTags


    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = postCreate


    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }


    const dispatch = useDispatch()



    const redirect = location.search ? location.search.split('=')[1] : '/'


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(getTagsAction())
        dispatch({type:RESET_CREATE_POSTS})
        if (!userInfo){
            history.push('/login')
        }
        if (successCreate){
            history.push(`/`)
        }

    }, [dispatch,history, userInfo,redirect,successCreate])

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]


        const formData = new FormData()
        formData.append('image', file)
        console.log(formData)
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

    const s = {
        text,title,photo,tag,description
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(s)
            dispatch(createPostAction(s))
            notify()
           
            setTimeout(() => { 
                history.push('/');
              }, 5000)
    }


const  handleChange=(e)=> {

        const selected=[];
        let selectedOption=(e.target.selectedOptions);

        for (let i = 0; i < selectedOption.length; i++){
            selected.push(selectedOption.item(i).value)
        }
        setTag(selected)
    }

    const notify = () => toast.success('🦄 Post Created Successfully,Redirecting', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;
    

    return (
        <>

        {/* <button onClick={notify}>Notify!</button> */}
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
      
        <Row >
            <Col xs={12} md={6}>
        <FormContainer>
            <h1>New Post</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Title'
                        value={title}
                        required
                        onChange={(e) => settitle(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        required

                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>



                <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                    <Form.File id='image-file' label='Choose File'
                    custom
                    required
                               onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader/>}


                </Form.Group>


                <Form.Group controlId='image'>
                    <Form.Label>Tags <br/> </Form.Label>

                    <select multiple onChange={handleChange.bind(this)} required >
                        {
                            tags.map(item => (
                                <option value={item?._id}>{item.name}</option>
                            ))
                        }
                    </select>
                </Form.Group>

                <Editor
                    name={text}
                    onTextChange={(pr)=> settext(pr)} />

                <Button type='submit' variant='primary'>
                    ADD
                </Button>
            </Form>


        </FormContainer>
            </Col>
            <Col xs={12} md={6}>
           
                <Row>
                    <Col md={2} xs={12}>
                        <div className="share">
                            <p>
                                Share
                            </p>
                            <ul>
                                <li>
                                    <a target="_blank"
                                       href="https://twitter.com/home?status=http%3A//www.wowthemes.net">
                                        <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path
                                                d="M21.967 11.8c.018 5.93-4.607 11.18-11.177 11.18-2.172 0-4.25-.62-6.047-1.76l-.268.422-.038.5.186.013.168.012c.3.02.44.032.6.046 2.06-.026 3.95-.686 5.49-1.86l1.12-.85-1.4-.048c-1.57-.055-2.92-1.08-3.36-2.51l-.48.146-.05.5c.22.03.48.05.75.08.48-.02.87-.07 1.25-.15l2.33-.49-2.32-.49c-1.68-.35-2.91-1.83-2.91-3.55 0-.05 0-.01-.01.03l-.49-.1-.25.44c.63.36 1.35.57 2.07.58l1.7.04L7.4 13c-.978-.662-1.59-1.79-1.618-3.047a4.08 4.08 0 0 1 .524-1.8l-.825.07a12.188 12.188 0 0 0 8.81 4.515l.59.033-.06-.59v-.02c-.05-.43-.06-.63-.06-.87a3.617 3.617 0 0 1 6.27-2.45l.2.21.28-.06c1.01-.22 1.94-.59 2.73-1.09l-.75-.56c-.1.36-.04.89.12 1.36.23.68.58 1.13 1.17.85l-.21-.45-.42-.27c-.52.8-1.17 1.48-1.92 2L22 11l.016.28c.013.2.014.35 0 .52v.04zm.998.038c.018-.22.017-.417 0-.66l-.498.034.284.41a8.183 8.183 0 0 0 2.2-2.267l.97-1.48-1.6.755c.17-.08.3-.02.34.03a.914.914 0 0 1-.13-.292c-.1-.297-.13-.64-.1-.766l.36-1.254-1.1.695c-.69.438-1.51.764-2.41.963l.48.15a4.574 4.574 0 0 0-3.38-1.484 4.616 4.616 0 0 0-4.61 4.613c0 .29.02.51.08.984l.01.02.5-.06.03-.5c-3.17-.18-6.1-1.7-8.08-4.15l-.48-.56-.36.64c-.39.69-.62 1.48-.65 2.28.04 1.61.81 3.04 2.06 3.88l.3-.92c-.55-.02-1.11-.17-1.6-.45l-.59-.34-.14.67c-.02.08-.02.16 0 .24-.01 2.12 1.55 4.01 3.69 4.46l.1-.49-.1-.49c-.33.07-.67.12-1.03.14-.18-.02-.43-.05-.64-.07l-.76-.09.23.73c.57 1.84 2.29 3.14 4.28 3.21l-.28-.89a8.252 8.252 0 0 1-4.85 1.66c-.12-.01-.26-.02-.56-.05l-.17-.01-.18-.01L2.53 21l1.694 1.07a12.233 12.233 0 0 0 6.58 1.917c7.156 0 12.2-5.73 12.18-12.18l-.002.04z"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank"
                                       href="https://www.facebook.com/sharer/sharer.php?u=http%3A//www.wowthemes.net">
                                        <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path
                                                d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
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


                            <Row className=" post-top-meta">
                                <Col md={2}>
                                    <img className="author-thumb"
                                         src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                         alt="Sal"/>
                                </Col>
                                <Col md={10}>
                                    <a className="link-dark" href="author.html">{userInfo.name}</a>
                                    <span
                                        className="author-description">{userInfo.description}</span>
                                    <span className="post-date">{new Date().toLocaleString() + ''}</span>
                                </Col>
                            </Row>


                            <h1 className="posttitle">{title}</h1>

                        </Col>


                        <img className="featured-image img-fluid" src={photo} alt=""/>
                        <h4 className="card-text">{description.slice(0,20)}</h4>
                        <div className="article-post">
                            <Markup content={text} />
                        </div>

                        <div className="after-post-tags">
                            <Tag tags={tag} />
                        </div>


                    </Col>
                </Row>
            </Col>
        </Row>
        </>

                )
}

const Editor = ({ text, onTextChange  }) => {
    const editor = useRef(null)
    const [p,setp] = useState('')
    const config = {}


    const handleInputChange = useCallback(x => {

        setp(x)
        onTextChange(x)
    }, [onTextChange(p)])


    return useMemo( () => (
        <JoditEditor ref={editor}  config={config}  onChange={handleInputChange} value={text}  />

    ), [] )
}

export default NewPostScreen
