import posts from '../components/Posts.js'
import Post from '../components/Post'
import {Row,Col,Container,Card,Carousel} from 'react-bootstrap'
import StockTicker from '../components/Ticker.js'

const HomeScreen = () =>{
    console.log(posts)

    return(
        <>
        <div className="mainheading" style={{backgroundColor:"#363636",color:"white"}}>
      <Container>
        <Row>
      
          <Col>
          <div className="mainheading">
          <p className="lead">
          Your Campus Life,Time & Vibe
		</p>
    </div>
          </Col>
        </Row>
        <Row>
          <Col >
          <StockTicker posts={posts} />
          </Col>
        </Row>
        </Container>
	
	</div>
<Container>
<section className="featured-posts">
	<div className="section-title">
		<h2><span>Featured</span></h2>
	</div>
    <Row>
			
			<Col xs={0} md={6} className="d-none d-lg-block">

      <Carousel variant="dark" style={{height:"100%"}} >
      {posts.map((post) => (

  <Carousel.Item style={{height:"100%"}} >
    <a href={`/post/${post._id}`} style={{height:"100%"}} >
    <img
    style={{
      background: "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))",height:"45vh"}}
      className="d-block w-100"
      src={`/images/${post.photo}`}
      alt={post.title}
    />
    <Carousel.Caption>
      <p>{post.title}</p>
    </Carousel.Caption>
    </a>
  </Carousel.Item>
))}
</Carousel>

	
			</Col>
			<Col xs={12} md={6}>
				
	<div className="card-columns listfeaturedtag">
			{posts.slice(0,4).map((post) => (
				<a href={`/post/${post._id}`}>
<Card className="bg-dark text-white h-100">
  <Card.Img src={`/images/${post.photo}`} alt="Card image" />
  <Card.ImgOverlay style={{  "background": "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))","height":"100%"}}>
  <div >
    <Card.Title style={{ textTransform: 'uppercase'}}>{post.title}</Card.Title>
    {/* <Card.Text>
      {post.description}
    </Card.Text> */}
	 </div>
 
  </Card.ImgOverlay>
</Card>
</a>
              ))}
</div>

			</Col>
		</Row>
    </section>

    <section class="recent-posts">
	<div class="section-title">
		<h2><span>Entertainment</span>
    <a href={`/tag/x`} className="float-right">Read More <i class="fas fa-angle-double-right"></i> </a> 

    </h2>

	</div>
        <Row>
        {
            
            posts.map(post => (
                <>
               
                <Post post={post}/>
              
              </>
            ))
        }
       </Row>
    </section>
       </Container>
        </>
    )
}

export default HomeScreen