import React, {  useState,useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col,Container, Image, ListGroup, Card, Button, Form, Badge} from 'react-bootstrap'
import { Markup } from 'interweave';
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import './CSS/PostScreen.css'
import Meta from '../../components/Meta'

import {listPostDetails} from '../../actions/postActions'
import {getPostsAction} from '../../actions/postActions'
import {getAuthorDetails} from '../../actions/userActions'


const TagPostScreen = ({ match }) => {

    const dispatch = useDispatch()

    const postlist = useSelector((state) => state.readPosts)
    const { loadingReadPosts, error, posts, page, pages } = postlist

    const tag_name = match.params.id



    useEffect(() => {
        dispatch(getPostsAction())
        
          },[dispatch] )


    return (
        <>
        <Container>
        <section className="featured-posts">
	<div className="section-title">
		<h2><span>{tag_name}</span></h2>
	</div>
  {loadingReadPosts ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
		<Row>
			
			<Col xs={12} md={6}>
			{posts.slice(0,1).map((post) => (
				<Link to={`/post/${post._id}`}>
<Card className="bg-dark text-white h-100">
  <Card.Img src={post.photo} alt="Card image" />
  <Card.ImgOverlay style={{  "background": "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))","height":"100%"}}>
	  <div style={{position:"relative",top:"50%"}}>
	  <Card.Title style={{ textTransform: 'uppercase'}} >{post.title}</Card.Title>
    <Card.Text>
      {post.description}
    </Card.Text>
    {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
	<small>Last updated 3 mins ago</small>
	  </div>
    

  </Card.ImgOverlay>
</Card>
</Link>
              ))}
			</Col>
			<Col xs={12} md={6}>
				
	<div className="card-columns listfeaturedtag">
			{posts.slice(1,5).map((post) => (
				<Link to={`/post/${post._id}`}>
<Card className="bg-dark text-white h-100">
  <Card.Img src={post.photo} alt="Card image" />
  <Card.ImgOverlay style={{  "background": "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))","height":"100%"}}>
  <div style={{position:"relative",top:"50%"}}>
    <Card.Title style={{ textTransform: 'uppercase'}}>{post.title.slice(0,36)}</Card.Title>
    {/* <Card.Text>
      {post.description}
    </Card.Text> */}
	 <small>Last updated 3 mins ago</small>
	 </div>
 
  </Card.ImgOverlay>
</Card>
</Link>
              ))}
</div>

			</Col>
		</Row>

  


)}
</section>
        </Container>
        </>
    )
}

export default TagPostScreen
