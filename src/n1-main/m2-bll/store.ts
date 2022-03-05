import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Reducer } from "./reducer";
import {authReducer} from './authReducer';


const rootReducer = combineReducers({
    temp: Reducer,
    auth:authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;