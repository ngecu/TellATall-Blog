import axios from 'axios'
import {
  REQUEST_CREATE_POSTS,
  SUCCESS_CREATE_POSTS,
  FAIL_CREATE_POSTS,
  RESET_CREATE_POSTS,

  REQUEST_READ_POSTS,
  SUCCESS_READ_POSTS,
  FAIL_READ_POSTS,

  REQUEST_UPDATE_POSTS,
  SUCCESS_UPDATE_POSTS,
  FAIL_UPDATE_POSTS,

  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,

  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,

  POST_LIST_MY_REQUEST,
  POST_LIST_MY_SUCCESS,
  POST_LIST_MY_FAIL,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  REQUEST_READ_AUTHOR_POSTS,
  SUCCESS_READ_AUTHOR_POSTS

} from '../constants/postConstants'
import { logout } from './userActions'

export const listPosts = (keyword = '', pageNumber = '') => async (
    dispatch
) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const { data } = await axios.get(
        `/api/posts/AllPosts?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
}


export const createPostAction = (formData) => async (dispatch, getState) => {

  try {
    dispatch({
      type: REQUEST_CREATE_POSTS
    })


    const {
      userLogin: { userInfo },
    } = getState()


    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const user = userInfo._id


    const { data } = await axios.post(`/api/posts/${user}`,formData,config)


    if(data) {
      dispatch({
        type: SUCCESS_CREATE_POSTS,
        payload: data
      })

    }
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FAIL_CREATE_POSTS,
      payload: message,
    })
  }
}

export const getAuthorPostsAction = (authorID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_READ_AUTHOR_POSTS
    })

    const { data } = await axios.get(`/api/posts/author/${authorID}`)
    if(data) {
      dispatch({
        type: SUCCESS_READ_AUTHOR_POSTS,
        payload: data
      })

    }
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }

  }
}



export const getPostsAction = (x) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_READ_POSTS
    })

    const { data } = await axios.get(`/api/posts/AllPosts`)
    if(data) {
      dispatch({
        type: SUCCESS_READ_POSTS,
        payload: data
      })

    }
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }

  }
}


export const listPostDetails = (id) => async (dispatch) => {

  try {
    dispatch({ type: POST_DETAILS_REQUEST })


    const { data } = await axios.get(`/api/posts/${id}`)
    const new_d = data[0]
    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: new_d,
    })
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
}


export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_UPDATE_POSTS,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }



    const { data } = await axios.put(
        `/api/posts/${post._id}`,
        post
    )

    dispatch({
      type: SUCCESS_UPDATE_POSTS,
      payload: data,
    })
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FAIL_UPDATE_POSTS,
      payload: message,
    })
  }
}


export const listMyPosts = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()


    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/posts/author/${id}`, config)


    dispatch({
      type: POST_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: POST_LIST_MY_FAIL,
      payload: message,
    })
  }
}


export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/${id}`, config)

    dispatch({
      type: POST_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: POST_DELETE_FAIL,
      payload: message,
    })
  }
}