import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType"


const initialValue = {
    createNewPost: null,
    getSinglePost: null,
    deletePost: null,
    likePost: null,
    unLikePost: null,
    savePost: null,
    unSavePost: null,
    getUserPost: [],
    profilePost: null


}

export const PostReducer = (store = initialValue, { type, payload }) => {

    if (type === CREATE_NEW_POST) {

        return { ...store, createNewPost: payload };
    }
    else if (type === GET_USER_POST) {
        return { ...store, getUserPost: payload };
    }
    else if (type === DELETE_POST) {

        return { ...store, deletePost: payload };
    }
    else if (type === SAVE_POST) {
        return { ...store, savePost: payload };
    }
    else if (type === UNSAVE_POST) {
        return { ...store, unSavePost: payload };
    }
    else if (type === GET_SINGLE_POST) {
        return { ...store, getSinglePost: payload };
    }
    else if (type === LIKE_POST) {
        return { ...store, likePost: payload };
    }
    else if (type === UNLIKE_POST) {
        return { ...store, unLikePost: payload };
    }
    return store;
}