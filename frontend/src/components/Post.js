import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Markup } from 'interweave';
import {Badge, Col} from "react-bootstrap";
import {getTagsAction} from "../actions/tagActions";

const deleteHandler = (id)=>{
    console.log(id)
}



const Post = ({ post }) => {

    return (



      <div >
          <Link to={`/post/${post._id}`}>
              <img className="img-fluid" style={{height:"30vh",width:"100%"}} src={post.photo} alt={post.photo}/>
          </Link>
          <div className="card-block">
              <h2 className="card-title"><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
              <div className="metafooter">
                  <div className="wrapfooter">

						<span className="meta-footer-thumb">

                            <Link to={`/author/${post.author._id}`}>


                            <img className="author-thumb"
                                                   src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                                   alt="Sal"/>
                            </Link>
						</span>
                      <span className="author-meta">
                          <span className="post-name"> <Link to={`/author/${post.author._id}`}>{post.author.name}</Link></span><br/>
						<span className="post-date">{post.createdAt.substring(0, 10)}</span><span className="dot"></span>
						</span>

                  </div>
              </div>
          </div>
      </div>







  )
}

export default Post
