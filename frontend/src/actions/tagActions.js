import {REQUEST_READ_TAGS, SUCCESS_READ_TAGS} from "../constants/tagConstants";
import axios from "axios";
import {logout} from "./userActions";

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