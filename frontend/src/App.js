import React,{useState,useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Container, Nav} from 'react-bootstrap'
// import Header from './components/Header'


import NH from './components/NH'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'

import UserListScreen from './screens/Admin/UserListScreen'
import PostListScreen from './screens/Admin/PostListScreen'

import UserEditScreen from "./screens/Admin/UserEditScreen";
import TagScreen from './screens/Admin/TagListScreen'

import LoginScreen from './screens/Auth/LoginScreen'
import RegisterScreen from './screens/Auth/RegisterScreen'
import PostEditScreen from './screens/Admin/PostEditScreen'
import PostScreen from "./screens/Posts/PostScreen";
import NewPostScreen from "./screens/Posts/NewPostScreen";
import updatePostScreen from "./screens/Posts/updatePostScreen";
import AllPostsScreen from './screens/Posts/AllPostsScreen';
import TagPostScreen from './screens/Posts/TagPostScreen';


import AuthorPostsScreen from "./screens/Posts/AuthorPostsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";


import './style.css'
import TagEditScreen from './screens/Admin/TagEditScreen'




const App = () => {
  return (
    <Router>
      <NH className="header1"  />
<div className="App"   style={{minHeight: "75rem",paddingTop:"4.5rem",backgroundColor:"#f2f3f5"}}>



{/*<Header/>*/}

       
            
      <main className='py-3'>



          <Route path='/allPosts' component={AllPostsScreen} />
          {/*<Route path='/createPost/:userId' component={CreatePostScreen} />*/}
          {/*<Route path='myPosts/:userId' component={MyPostsScreen} />*/}


            <Route path='/profile' component={ProfileScreen} />


          <Route path='/post/:id' component={PostScreen} />
          <Route path='/tag/:id' component={TagPostScreen} />
            <Route path='/newPost' component={NewPostScreen} />
            <Route path='/updatepost/:id' component={updatePostScreen} />

            <Route path="/author/:id" component={AuthorPostsScreen} />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />


          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/taglist' component={TagScreen} />

          <Route path='/admin/postlist' component={PostListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/post/:id/edit' component={PostEditScreen} />
          {/* <Route path='/admin/tag/:id/edit' component={TagEditScreen} /> */}

          <Route path='/' component={HomeScreen} exact />
      </main>
      {/* <Footer /> */}
</div>
       
    </Router>

  )
}

export default App
