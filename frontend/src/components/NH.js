import React,{useState, useEffect  }  from 'react'
import { Route } from 'react-router-dom'



import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import logo from '../resources/images/logo.png'
import {getTagsAction} from "../actions/tagActions";
import Tag from "./Tag";

const NH = () => {
    const dispatch = useDispatch()
    const [tag, setTag] = useState([])

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const tagList = useSelector((state)=>state.readTags)
    const {tags} = tagList
    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getTagsAction())
    },[dispatch,getTagsAction])

    return (
        <header>

            <Navbar style={{borderBottom:"solid  #3737f7 "}} bg='light' variant='light' fixed="top" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/' style={{fontFamily:"Righteous"}}>
                        <Navbar.Brand  ><img  className="my-0" src={logo} style={{maxWidth: "70px",maxHeight: "70px"}} />TellATale  </Navbar.Brand>
                    </LinkContainer>

                  
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      {tags.map((tag)=>(
          <Nav.Link href={`/tag/${tag.name}`}>{tag.name}</Nav.Link>
      ))}
     
      </Nav>
    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/*<Route render={({ history }) => <SearchBox history={history} />} />*/}
                        <Nav className='ml-auto'>
                            
                        <NavDropdown title={<i class='fas fa-user'></i>} id="basic-nav-dropdown">
                            {userInfo ? (
                                
                                  <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/newPost'>
                                        <NavDropdown.Item>New Post</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                               

                              
                            ) : (

                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/postlist'>
                                        <NavDropdown.Item>Posts</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/taglist'>
                                        <NavDropdown.Item>Tags</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                            </NavDropdown>

                            
                        </Nav>
                    


                        {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success"><i class="fas fa-search"></i></Button>
    </Form> */}
   
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NH