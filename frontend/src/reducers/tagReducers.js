import { REQUEST_CREATE_POSTS } from "../constants/postConstants";
import {FAIL_READ_TAGS,
     REQUEST_READ_TAGS, 
     SUCCESS_READ_TAGS,
    
     REQUEST_CREATE_TAGS,
     SUCCESS_CREATE_TAGS,
     FAIL_CREATE_TAGS,
     RESET_CREATE_TAGS,

     REQUEST_UPDATE_TAGS,
     SUCCESS_UPDATE_TAGS,
     FAIL_UPDATE_TAGS,
     RESET_UPDATE_TAGS,

     TAG_DELETE_FAIL,
     TAG_DELETE_SUCCESS,
     TAG_DELETE_REQUEST
    } from "../constants/tagConstants";

export const ReadTagsReducer = (state = {tags: []}, action) => {

    switch (action.type) {

        case REQUEST_READ_TAGS:
            return {...state, loadingReadTags: true,tags: []}
        case SUCCESS_READ_TAGS:
            return {...state, loadingReadTags: false, successReadPosts:true, tags: action.payload}
        case FAIL_READ_TAGS:
            return {...state, loadingReadTags:false, errorReadPosts:true, errorPayloadReadPosts: action.payload}
        default:
            return state
    }
}


export const CreateTagsReducer = (state = {}, action) => {

    switch (action.type) {
  
      case REQUEST_CREATE_TAGS:
        return {...state, loadingCreateTags: true}
      case SUCCESS_CREATE_TAGS:
        return {...state, loadingCreateTags: false, successCreateTags:true, payloadCreateTags: action.payload}
      case FAIL_CREATE_TAGS:
        return {...state, loadingCreateTags:false, errorCreateTags:true, errorPayloadCreateTags: action.payload}
      case RESET_CREATE_TAGS:
        return {}
      default:
        return  state
    }
  }


//update reducer
export const UpdateTagsReducer = (state = {}, action) => {

    switch (action.type) {
  
      case REQUEST_UPDATE_TAGS:
        return {...state, loadingUpdateTags: true}
      case SUCCESS_UPDATE_TAGS:
        return {...state, loadingUpdateTags: false, successUpdateTags:true, payloadUpdateTags: action.payload}
      case FAIL_UPDATE_TAGS:
        return {...state, loadingUpdateTags:false, errorUpdateTags:true, errorPayloadUpdateTags: action.payload}
      default:
        return state
    }
  }
  
  
  export const tagDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TAG_DELETE_REQUEST:
        return { loading: true }
      case TAG_DELETE_SUCCESS:
        return { loading: false, success: true }
      case TAG_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  