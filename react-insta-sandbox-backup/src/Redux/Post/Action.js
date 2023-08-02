import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";


const BASE_API = "http://localhost:8083/api"

export const createPostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/create`, {

            method: "POST",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            },
            body: JSON.stringify(data.data)

        })

        const post = await res.json();

        dispatch({ type: CREATE_NEW_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}

export const findPostsByUserIdAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/all/${data.userId}`, {

            method: "GET",
            headers: {


                "Content-Type": "application/json",
                Authorization: "Bearer" + data.jwt
            }


        })
        const posts = await res.json();

        console.log("Find posts by userId", posts);

        dispatch({ type: REQ_USER_POST, payload: posts });

    } catch (error) {
        console.log("Catch : ", error);
    }

}

export const findUserPostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/following/${data.userIds}`, {

            method: "GET",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const posts = await res.json();

        console.log("Find Post By User Ids", posts);

        dispatch({ type: GET_USER_POST, payload: posts })


    } catch (error) {
        console.log("Catch : ", error);

    }

}

export const likePostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/like/${data.postId}`, {

            method: "PUT",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Like Post", post);

        dispatch({ type: LIKE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}

export const unLikePostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/unlike/${data.postId}`, {

            method: "PUT",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Unlike Post", post);

        dispatch({ type: UNLIKE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}
export const savePostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/save_post/${data.postId}`, {

            method: "PUT",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Save Post", post);

        dispatch({ type: SAVE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}
export const unSavedPostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/unsaved_post/${data.postId}`, {

            method: "PUT",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Unsaved Post", post);

        dispatch({ type: UNSAVE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}
export const findPostByIdAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/${data.postId}`, {

            method: "GET",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Get Post By Post Id", post);

        dispatch({ type: GET_SINGLE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}
export const deletePostAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/posts/delete/${data.postId}`, {

            method: "DELETE",
            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer" + data.jwt
            }

        })

        const post = await res.json();

        console.log("Deleted Post", post);

        dispatch({ type: DELETE_POST, payload: post })


    } catch (error) {
        console.log("Catch : ", error);

    }

}

