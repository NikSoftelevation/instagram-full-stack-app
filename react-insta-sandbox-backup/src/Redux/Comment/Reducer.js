import { CREATE_COMMENT, GET_POST_COMMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType"

const initialValue = {

    createdComment: null,
    getPostComment: null,
    likeComment: null,
    unLikeComment: null,

}

export const CommentReducer = (store = initialValue, { type, payload }) => {

    if (type === CREATE_COMMENT) {
        return { ...store, createdComment: payload };
    }

    else if (type === GET_POST_COMMMENT) {
        return { ...store, getPostComment: payload };
    }
    else if (type === LIKE_COMMENT) {
        return { ...store, likeComment: payload };
    }
    else if (type === UNLIKE_COMMENT) {
        return { ...store, unLikeComment: payload };
    }
}