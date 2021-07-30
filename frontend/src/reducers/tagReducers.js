import {FAIL_READ_TAGS, REQUEST_READ_TAGS, SUCCESS_READ_TAGS} from "../constants/tagConstants";

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