import {
  REQUEST_CREATE_POSTS,
  SUCCESS_CREATE_POSTS,
  FAIL_CREATE_POSTS,
  RESET_CREATE_POSTS,

  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,

  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,

  REQUEST_READ_POSTS,
  SUCCESS_READ_POSTS,
  FAIL_READ_POSTS,

  REQUEST_UPDATE_POSTS,
  SUCCESS_UPDATE_POSTS,
  FAIL_UPDATE_POSTS,

  POST_LIST_MY_REQUEST,
  POST_LIST_MY_SUCCESS,
  POST_LIST_MY_FAIL,
  POST_LIST_MY_RESET,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS, POST_LIST_FAIL, REQUEST_READ_AUTHOR_POSTS, SUCCESS_READ_AUTHOR_POSTS, FAIL_READ__AUTHOR_POSTS
} from '../constants/postConstants'



export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//create reducer
export const CreatePostsReducer = (state = {}, action) => {

  switch (action.type) {

    case REQUEST_CREATE_POSTS:
      return {...state, loadingCreatePosts: true}
    case SUCCESS_CREATE_POSTS:
      return {...state, loadingCreatePosts: false, successCreatePosts:true, payloadCreatePosts: action.payload}
    case FAIL_CREATE_POSTS:
      return {...state, loadingCreatePosts:false, errorCreatePosts:true, errorPayloadCreatePosts: action.payload}
    case RESET_CREATE_POSTS:
      return {}
    default:
      return  state
  }
}


export const postDetailsReducer = (state = {post:{}}, action) => {

  switch (action.type) {

    case POST_DETAILS_REQUEST:
      return {...state, loading: true}
    case POST_DETAILS_SUCCESS:
      return {...state, loading: false, success:true, post: action.payload}
    case POST_DETAILS_FAIL:
      return {...state, loading:false,  error: action.payload}
    default:
      return state
  }
}

//read reducer


export const ReadPostsReducer = (state = {posts: []}, action) => {

  switch (action.type) {

    case REQUEST_READ_POSTS:
      return {...state, loadingReadPosts: true,posts: []}
    case SUCCESS_READ_POSTS:
      return {...state, loadingReadPosts: false, successReadPosts:true, posts: action.payload}
    case FAIL_READ_POSTS:
      return {...state, loadingReadPosts:false, errorReadPosts:true, errorPayloadReadPosts: action.payload}
    default:
      return state
  }
}

export const ReadAuthorPostsReducer = (state = {posts: []}, action) => {

  switch (action.type) {

    case REQUEST_READ_AUTHOR_POSTS:
      return {...state, loadingReadPosts: true,posts: []}
    case SUCCESS_READ_AUTHOR_POSTS:
      return {...state, loadingReadPosts: false, successReadPosts:true, posts: action.payload}
    case FAIL_READ__AUTHOR_POSTS:
      return {...state, loadingReadPosts:false, errorReadPosts:true, errorPayloadReadPosts: action.payload}
    default:
      return state
  }
}

//update reducer
export const UpdatePostsReducer = (state = {}, action) => {

  switch (action.type) {

    case REQUEST_UPDATE_POSTS:
      return {...state, loadingUpdatePosts: true}
    case SUCCESS_UPDATE_POSTS:
      return {...state, loadingUpdatePosts: false, successUpdatePosts:true, payloadUpdatePosts: action.payload}
    case FAIL_UPDATE_POSTS:
      return {...state, loadingUpdatePosts:false, errorUpdatePosts:true, errorPayloadUpdatePosts: action.payload}
    default:
      return state
  }
}


export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true }
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true }
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postListMyReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case POST_LIST_MY_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      }
    case POST_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}