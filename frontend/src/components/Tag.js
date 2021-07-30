import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Markup } from 'interweave';
import {Badge, Col,Row} from "react-bootstrap";
import {getTagsAction} from "../actions/tagActions";

const deleteHandler = (id)=>{
    console.log(id)
}



const Tag = ({tags} ) => {
    console.log(tags)
    if(tags){
        tags.map(tag=>console.log(tag))

    }

    return (



        <ul className="tags">
            {tags && tags.map((tag)=>(
                <li style={{backgroundColor:tag.color,color:"white"}}>{tag.name}</li>
            ))

            }


        </ul>


    )
}

export default Tag

