import { CREATE_COMMENT, GET_POST_COMMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";


const BASE_API = "http://localhost:8083/api"

export const createCommentAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/comments/create/${data.postId}`, {

            method: "POST",
            headers: {

                "Content_Type": "application/json",
                Authorization: "Bearer" + data.jwt,
            },
            body: JSON.stringify(data.data)

        })

        const comment = await res.json();

        console.log("Created Comment ", comment);

        dispatch({ type: CREATE_COMMENT, payload: comment });



    } catch (error) {
        console.log("Catch : ", error);
    }
}

export const findPostCommentAction = (data) => async (dispatch) => {

    try {


        const res = await fetch(`${BASE_API}/comments/${data.commentId}`, {


            method: "GET",
            headers: {


                "Content_Type": "application/json",
                Authorization: "Bearer" + data.jwt,
            },
        })

        const comment = await res.json();

        console.log(" Comment ", comment);

        dispatch({ type: GET_POST_COMMMENT, payload: comment });



    } catch (error) {
        console.log("Catch : ", error);
    }
}
export const likeCommentAction = (data) => async (dispatch) => {

    try {


        const res = await fetch(`${BASE_API}/comments/like/${data.commentId}`, {


            method: "PUT",
            headers: {


                "Content_Type": "application/json",
                Authorization: "Bearer" + data.jwt,
            },
        })

        const comment = await res.json();

        console.log(" Liked Comment ", comment);

        dispatch({ type: LIKE_COMMENT, payload: comment });



    } catch (error) {
        console.log("Catch : ", error);
    }
}
export const unlikeCommentAction = (data) => async (dispatch) => {

    try {


        const res = await fetch(`${BASE_API}/comments/unlike/${data.commentId}`, {


            method: "PUT",
            headers: {


                "Content_Type": "application/json",
                Authorization: "Bearer" + data.jwt,
            },
        })

        const comment = await res.json();

        console.log(" Unliked Comment ", comment);

        dispatch({ type: UNLIKE_COMMENT, payload: comment });



    } catch (error) {
        console.log("Catch : ", error);
    }
}