import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Markup } from 'interweave';
import {Badge, Col,Row} from "react-bootstrap";
import {getTagsAction} from "../actions/tagActions";

const deleteHandler = (id)=>{
    console.log(id)
}



const Tag = ({tags,date} ) => {
    console.log(tags)
    if(tags){
        tags.map(tag=>console.log(tag))

    }

    return (



        <ul className="tags">
            {tags && tags.map((tag)=>(
                <li style={{color:tag.color}}>{tag?.name?.toUpperCase()}</li>
                
            ))

            }
            <li>{date?.substring(0, 10)}</li>


        </ul>


    )
}

export default Tag


