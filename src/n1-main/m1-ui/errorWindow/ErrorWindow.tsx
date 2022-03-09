import s from "./ErrorWindow.module.css"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../m2-bll/reducers/authReducer";
import {AppRootStateType} from "../../m2-bll/store";


export const ErrorWindow = () => {

    const errorText = useSelector<AppRootStateType, string>(state => state.auth.errorText)

    const  dispatch = useDispatch()

    const closeClickHandler = () => {
        dispatch(setError(false))
    }



    return (
        <div className={s.block_main}>
            <div className={s.close} onClick={closeClickHandler}></div>
            {errorText}
        </div>
    )
}