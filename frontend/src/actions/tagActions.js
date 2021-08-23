import {REQUEST_READ_TAGS, SUCCESS_READ_TAGS,

    REQUEST_CREATE_TAGS,
    SUCCESS_CREATE_TAGS,
    FAIL_CREATE_TAGS,
    

    REQUEST_UPDATE_TAGS,
    SUCCESS_UPDATE_TAGS,
    FAIL_UPDATE_TAGS,

    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_DELETE_FAIL

} from "../constants/tagConstants";
import axios from "axios";
import {logout} from "./userActions";

export const createTagAction = (formData) => async (dispatch, getState) => {

    try {
      dispatch({
        type: REQUEST_CREATE_TAGS
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
  
  
      const { data } = await axios.post(`/api/tags/${user}`,formData,config)
  
  
      if(data) {
        dispatch({
          type: SUCCESS_CREATE_TAGS,
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
        type: FAIL_CREATE_TAGS,
        payload: message,
      })
    }
  }

  export const updateTag = (tag) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REQUEST_UPDATE_TAGS,
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
          `/api/tags/${tag._id}`,
          tag
      )
  
      dispatch({
        type: SUCCESS_UPDATE_TAGS,
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
        type: FAIL_UPDATE_TAGS,
        payload: message,
      })
    }
  }

export const getTagsAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_READ_TAGS
        })

        const { data } = await axios.get(`/api/tags/AllTags`)
        console.log("tags",data)
        if(data) {
            dispatch({
                type: SUCCESS_READ_TAGS,
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


export const deleteTag = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TAG_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/tags/${id}`, config)
  
      dispatch({
        type: TAG_DELETE_SUCCESS,
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
        type: TAG_DELETE_FAIL,
        payload: message,
      })
    }
  }