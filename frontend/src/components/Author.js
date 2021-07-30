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

            <Col md={2}>
                <img className="author-thumb"
                                           src={author?.image}
                                           alt="Sal"/>
            </Col>
            <Col md={10}>
                {author?.name}
                <span className="author-description">{author?.description}</span>
                <span className="post-date">{author?.createdAt}</span>
            </Col>
        </Row>



    )
}

export default Author
