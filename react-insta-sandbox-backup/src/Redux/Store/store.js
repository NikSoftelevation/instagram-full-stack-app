import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthReducer } from "../Auth/Reducer";
import thunk from "redux-thunk";
import { UserReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { StoryReducer } from "../Story/Reducer";


const rootReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    post: PostReducer,
    comment: CommentReducer,
    story: StoryReducer,

})

export const store = createStore(rootReducers, applyMiddleware(thunk));