import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Reducer } from "./reducer";


const rootReducer = combineReducers({
    temp: Reducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;