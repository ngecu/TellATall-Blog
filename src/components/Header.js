import React,{useState, useEffect  }  from 'react'
// import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

import logo from '../resources/images/logo.png'



console.log("logo is",logo); 

const Header = () => {
 
    return (
        <header>

            <Navbar style={{borderBottom:"solid  #3737f7 "}} bg='light' variant='light' fixed="top" expand='lg' collapseOnSelect>
                <Container>
                    {/* <LinkContainer to='/' style={{fontFamily:"Righteous"}}> */}
                        <Navbar.Brand  ><img  className="my-0" src={logo}
                         style={{maxWidth: "70px",
                         maxHeight: "70px",
                        }}
                         />TellATale  </Navbar.Brand>
                    {/* </LinkContainer> */}

                  
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">

      <div class="topnav" id="myTopnav">
     
</div>
    
     
      </Nav>
    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/*<Route render={({ history }) => <SearchBox history={history} />} />*/}
                        <Nav className='ml-auto'>
                            
                        <NavDropdown title={<i class='fas fa-user'></i>} id="basic-nav-dropdown">
                           
                            
                            </NavDropdown>

                            
                        </Nav>
                    


            
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header