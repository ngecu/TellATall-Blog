import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,Container,Card } from 'react-bootstrap'
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
		<h1 className="sitetitle">TellATale</h1>

          </Col>
          <Col>
          <div className="mainheading">
          <p className="lead">
    Your go-to entertainment & lifestyle news website.
		</p>
    </div>
          </Col>
        </Row>
        <Row>
          <Col>
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
			
			<Col xs={6} md={6}>
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
			<Col xs={6} md={6}>
				
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
  
<section class="recent-posts">
	<div class="section-title">
		<h2><span>All Stories</span></h2>
	</div>
  {loadingReadPosts ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
	<Row className="listrecent" > 
    {posts.map((post) => (
    <>
       {post.author.isApproved ? (
        <Col xs={4} md={4}>
        <Link to={`/post/${post._id}`}>
           <img class="img-fluid" src={post.photo} alt={post.photo} height="20vh"/>
       </Link>
         <div class="card-block">
           <h2 class="card-title"><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
           <h4 class="card-text">{post?.description.slice(0,20)}</h4>
           <div class="metafooter">
             <div class="wrapfooter">
               <span class="meta-footer-thumb">
               <a href="author.html"><img class="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal"/></a>
               </span>
               <span class="author-meta">
               <span class="post-name"><Link to={`/author/${post.author._id}`}>{post.author.name}</Link><br/>
               <span class="post-date">{post.createdAt.substring(0, 10)}</span><span class="dot"></span><span class="post-read">6 min read</span>
               </span>
               <span class="post-read-more"><a href="post.html" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>
             </span>
             </div>
           </div>
         </div>
       </Col>
       ) : (
        <> </>
       )}
    </>
		
     ))}
    </Row>
    )}
  </section>

          </Container>

       


      </>
  )
}

export default HomeScreen
