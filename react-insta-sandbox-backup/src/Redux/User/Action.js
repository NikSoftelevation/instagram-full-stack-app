import { FOLLOW_USER, GET_USERS_BY_USER_IDS, GET_USER_BY_USERNAME, POPULAR_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";


const BASE_API = "http://localhost:8083/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8083/api/users/profile/req", {

            method: "GET",

            headers: {

                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })

        const reqUser = await res.json()
        dispatch({ type: REQ_USER, payload: reqUser });
    } catch (error) {
        console.log("Catch : ", error);
    }
}

export const findUserByUserNameAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/username/${data.username}`, {


        method: "GET",
        headers: {

            "Content-Type": "application/json",
            Authorization: "Bearer" + data.jwt
        }
    });
    const user = await res.json();

    console.log("Find By Username ", user);

    dispatch({ type: GET_USER_BY_USERNAME, payload: user });

}

export const findUserByUserIdsAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/ids/${data.userIds}`, {


        method: "GET",
        headers: {

            "Content-Type": "application/json",
            Authorization: "Bearer" + data.jwt
        }
    });
    const users = await res.json();

    console.log("Find By User Ids ", users);

    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });

}
export const followUserAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {


        method: "PUT",
        headers: {

            "Content-Type": "application/json",
            Authorization: "Bearer" + data.jwt
        }
    });
    const user = await res.json();

    console.log("Follow User ", user);

    dispatch({ type: FOLLOW_USER, payload: user });

}
export const unFollowUserAction = (data) => async (dispatch) => {

    const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {


        method: "PUT",
        headers: {

            "Content-Type": "application/json",
            Authorization: "Bearer" + data.jwt
        }
    });
    const user = await res.json();

    console.log("UnFollow User ", user);

    dispatch({ type: UNFOLLOW_USER, payload: user });

}
export const searchUserAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/users/search?q=${data.query}`, {


            method: "GET",
            headers: {

                "Content-Type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const user = await res.json();

        console.log("Search User ", user);

        dispatch({ type: SEARCH_USER, payload: user });

    } catch (error) {
        console.log("Catch Error", error);
    }
}

export const editUserAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/users/account/edit`, {


            method: "PUT",
            headers: {

                "Content-Type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
            body: JSON.stringify(data.data)
        });
        const user = await res.json();

        console.log("Edited User ", user);

        dispatch({ type: UPDATE_USER, payload: user });

    } catch (error) {
        console.log("Catch Error", error);
    }
}
export const findPopularUser = (jwt) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/users/popular`, {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + jwt
            }
        })
        const user = await res.json();

        console.log("Edited User : ", user);

        dispatch({ type: POPULAR_USER, payload: user })
    } catch (error) {
        console.log("Catch : ", error);
    }

}