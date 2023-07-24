import { store } from "../Store/store"
import { REQ_USER } from "./ActionType"

const initialValue = {

    reqUser: null,


}

export const UserReducer = (store = initialValue, { type, payload }) => {


    if (type === REQ_USER) {


        return { ...store, reqUser: payload };
    }
    return store;
}