import React,{useState, useEffect  }  from 'react'
import {Container, Navbar,Nav,Card,Form,Button} from 'react-bootstrap'
import logo from '../resources/images/logo.png'
import { LinkContainer } from 'react-router-bootstrap'


const Footer = () => {
 

    return (
   
<footer className="page-footer font-small blue pt-4" style={{borderTop:"solid  #3737f7 "}}>
    <div className="container-fluid text-center text-md-left">
        <Container>
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                 <a href='/'>
                        <Navbar.Brand  ><img  className="my-0" src={logo} style={{maxWidth: "70px",maxHeight: "70px"}} />TellATale  </Navbar.Brand>
                    </a>
                <p>Your Campus Life,Time & Vibe</p>
                <p>
                We provide you with the latest breaking news, gossip and videos straight from the industry.
                </p>
                <p>
                Contact us: <Nav.Link href="mailto:devngecu@gmail.com">devngecu@gmail.com </Nav.Link>
                </p>
                <p>
                GOT A TIP? drop us an email: <Nav.Link href="mailto:devngecu@gmail.com">devngecu@gmail.com </Nav.Link>                </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
              
                <ul className="list-unstyled">
          
     
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
            <Card style={{ width: '18rem' }}>
  <Card.Body>
  SIGN UP FOR OUR NEWSLETTER
    <Form  style={{"width":"100%"}}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
         Register
        </Button>
      </Form>
  </Card.Body>
</Card>
    
            </div>
        </div>
        </Container>
    </div>

    <div className="footer-copyright text-center py-3">© 2021 Copyright:
        <a href="https://www.instagram.com/_ngecu/"> dengecu.com</a>
    </div>

</footer>
    )
}

export default Footer