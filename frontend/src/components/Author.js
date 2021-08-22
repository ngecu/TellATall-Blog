import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Markup } from 'interweave';
import {Badge, Col,Row} from "react-bootstrap";
import {getTagsAction} from "../actions/tagActions";

const deleteHandler = (id)=>{
    console.log(id)
}



const Author = ({author} ) => {
        console.log("a",author?.name)
    return (


        <Row className=" post-top-meta">
            <Col md={6}>
                {author?.name}
                <br/>
                <i class="fas fa-edit"></i>
                <span>Digital Repoter</span>
                
            </Col>
        </Row>



    )
}

export default Author
