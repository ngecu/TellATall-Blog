import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,Container,Card,Carousel } from 'react-bootstrap'
import Product from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import StockTicker from '../components/Ticker';

import Paginate from '../components/Paginate'
import NewJoan from '../components/NewJoan'

import Meta from '../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
import {getPostsAction} from '../actions/postActions'
import {getTagsAction} from "../actions/tagActions";

import Post from "../components/Post";

const HomeScreen = ({history,match}) => {

  const getWordCount = (text) =>{
    let count = text.match(/\w+/g).length;
    return Math.ceil(count / 500)
  }

  const dispatch = useDispatch()
  const postlist = useSelector((state) => state.readPosts)


  const tagList = useSelector((state)=>state.readTags)

  const {tags} = tagList

  const { loadingReadPosts, error, posts, page, pages } = postlist

  useEffect(() => {
dispatch(getPostsAction())

  },[dispatch] )
  return (
      <>

      <Container>

      <div className="mainheading">
        <Row>
      
          <Col>
          <div className="mainheading">
          <p className="lead">
    Your Go-to Campus Life entertainment & lifestyle magazine.
		</p>
    </div>
          </Col>
        </Row>
        <Row>
          <Col >
          <StockTicker posts={posts} />
          </Col>
        </Row>
	
	</div>

  <section className="featured-posts">
	<div className="section-title">
		<h2><span>Featured</span></h2>
	</div>

  

  {loadingReadPosts ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
		<Row>
			
			<Col xs={12} md={6}>

      <Carousel variant="dark">
      {posts.map((post) => (

  <Carousel.Item>
    <Link to={`/post/${post._id}`}>
    <img
    style={{
      background: "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))",height:"20%"}}
  
      className="d-block w-100"
      src={post.photo}
      alt="First slide"
    />
    <Carousel.Caption>
      <h5>First slide label</h5>
      <p>{post.title}</p>
    </Carousel.Caption>
    </Link>
  </Carousel.Item>
))}
</Carousel>

	
			</Col>
			<Col xs={12} md={6}>
				
	<div className="card-columns listfeaturedtag">
			{posts.slice(0,5).map((post) => (
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
  <div>
  {tags.map((tag)=>(

    <section class="recent-posts">
	<div class="section-title">
		<h2><span>{tag.name}</span></h2>
	</div>
  {loadingReadPosts ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
	<Row className="listrecent" > 
    { posts.map((post) => (
    <>
       {post.author.isApproved && post?.tags.map((t) => (
         <>
         { t.name === tag.name ? (
         <Col xs={12} md={4}>
        <Link to={`/post/${post._id}`}>
           <img class="img-fluid" src={post.photo} alt={post.photo} height="20vh"/>
       </Link>
         <div class="card-block">
           <h2 class="card-title" style={{marginBottom:0}} ><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
           <div class="metafooter">
             <div class="wrapfooter">
               <span class="meta-footer-thumb">
               </span>
               <span class="author-meta">
               <span class="post-date">{post.createdAt.substring(0, 10)}</span><span class="dot"></span><span class="post-read">{getWordCount(post.text)} mins read</span>
               </span>
             
             </div>
           </div>
         </div>
       </Col>
       ) : (<> </>) }
        
       </>

       ))} 
        <> </>
       
    </>
		
     ))}
    </Row>
    )}
  </section>

  ))}
</div>
          </Container>

       


      </>
  )
}

export default HomeScreen
