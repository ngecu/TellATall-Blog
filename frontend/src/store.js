import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  CreatePostsReducer,
  postDetailsReducer,
  postDeleteReducer,
  ReadPostsReducer,
  UpdatePostsReducer,
  postListMyReducer,
  postListReducer,
  ReadAuthorPostsReducer
} from './reducers/postReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  authorListReducer
} from './reducers/userReducers'

import{
  ReadTagsReducer,UpdateTagsReducer,tagDeleteReducer
} from './reducers/tagReducers'

const reducer = combineReducers({

  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: CreatePostsReducer,
  postUpdate: UpdatePostsReducer,
  readPosts:ReadPostsReducer,
  readAuthorPosts:ReadAuthorPostsReducer,
  postlistMy:postListMyReducer,
  postList: postListReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  authorList:authorListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  readTags:ReadTagsReducer,
  updateTags:UpdateTagsReducer,
  deleteTags:tagDeleteReducer,


})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
