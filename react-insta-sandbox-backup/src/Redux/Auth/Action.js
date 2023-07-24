import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signInAction = (data) => async (dispatch) => {
    try {


        const res = await fetch("http://localhost:8083/signin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic" + btoa(data.email + ":" + data.password)
            }

        })

        const token = res.headers.get("Authorization");

        localStorage.setItem("token", token);

        dispatch({ type: SIGN_IN, payload: token });

        console.log("SignIn Token ", token);

    } catch (error) {

        console.log(error);
    }
}


export const signupAction = (data) => async (dispatch) => {
    try {


        const res = await fetch("http://localhost:8083/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })

        const user = await res.json();
        console.log("SignUp User ", user);

        dispatch({ type: SIGN_UP, payload: user });

    } catch (error) {
        console.log(error);

    }
}