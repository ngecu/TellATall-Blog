import React, {useState, useEffect} from 'react'
import {Form, Button, Container, Row, Col, ListGroup, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import Loader from './Loader'
import {UPLOAD_FAIL, UPLOAD_REQUEST, UPLOAD_SUCCESS} from '../Constants/UploadConstants'
import {Link} from 'react-router-dom'
import axios from "axios";

import {logout} from "../Actions/UserActions";
import FileRender from './RenderImageOrPDF'
const ProfileScreen = (props) => {

    const [file,setFile] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    



    const uploadFileBannerHandler = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            const formData = new FormData()
            formData.append('image', file)


            dispatch({
                type: UPLOAD_REQUEST
            })


            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',

                    Authorization: `Bearer ${userInfo.token}`,
                },
            }


            const {data} = await axios.post(`/api/upload/single/${props.purpose}`, formData, config)
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: data
            })
             setFile(data)
           props.sendLink(data)


        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
            const data = dispatch({
                type: UPLOAD_FAIL,
                payload: message,
            })

        }
    }

    return (
        <>




                    <>
                        <FileRender file={file}/>


                        <Form.Group controlId='IDPhotoFront'>

                            <Form.Label>{props.Label}</Form.Label>
                        <br/>
                            {props.required && <span style={{color:"red"}}>Required</span>}
                            <Form.File
                                id='image-file'
                                required={props.required}
                                placeholder='choose file'
                                label={file}
                                custom
                                onChange={(e) => uploadFileBannerHandler(e)}
                            ></Form.File>

                        </Form.Group>


                    </>

        </>
    )
}

export default ProfileScreen
