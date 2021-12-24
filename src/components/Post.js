import React from 'react'
import {Link} from 'react-router-dom'
import {Col} from 'react-bootstrap';
const Post = ({ post }) => {

    return (
      <Col xs={12} md={4} > 
      <Link to={`/post/${post._id}`}> 
              <img className="img-fluid" style={{height:"30vh",width:"100%"}} src={`/images/${post.photo}`} alt={`../resources/images/${post.photo}`}/>
              </Link>
          <div className="card-block">
              <h2 className="card-title">
              <Link to={`/post/${post._id}`}> 
                      {post.title}
                      </Link>
                  </h2>
              <div className="metafooter">
                  <div className="wrapfooter">
						<span className="meta-footer-thumb">
                            <Link to={`/post/${post._id}`}> 

                            <img className="author-thumb"
                                                   src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                                   alt="Sal"/>
                            </Link>
						</span>
                      <span className="author-meta">
                          <span className="post-name"> 
                          
                          <Link to={`/post/${post._id}`}> 

                              {post.author.name}
                              </Link>
                              </span><br/>
						<span className="post-date">{post.createdAt.substring(0, 10)}</span><span className="dot"></span>
						</span>

                  </div>
              </div>
          </div>
      </Col>







  )
}

export default Post
