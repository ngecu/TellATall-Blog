import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import logo from '../resources/images/logo.png'


const NH = ({toggleDarkMode,darkMode}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>

            <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><img  className="my-0" src={logo} style={{maxWidth: "70px",maxHeight: "70px"}} />  </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/*<Route render={({ history }) => <SearchBox history={history} />} />*/}
                        <Nav className='ml-auto'>

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

                                </NavDropdown>
                            )}

                            
                        </Nav>
                    


                        <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success"><i class="fas fa-search"></i></Button>
    </Form>
    <div onClick={toggleDarkMode}>
                        {darkMode ? <i class="fas fa-toggle-off"></i> : <i class="fas fa-toggle-on"></i>}

</div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NH