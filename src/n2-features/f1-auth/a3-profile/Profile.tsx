
import React from "react";
import { useDispatch } from "react-redux";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {setLogoutT} from "../../../n1-main/m2-bll/authReducer";
import {useTypedSelector} from "../../../n1-main/m2-bll/redux"
import { DateTime } from 'luxon'
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';

import s from './Profile.module.css'

export const Profile = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(setLogoutT());

    const user = useTypedSelector(state => state.auth.user)

    const registerData = DateTime.fromISO(user.created).toFormat('DDD')

    const isAuth=useSelector<AppRootStateType,boolean>(state => state.auth.isAuth);
    if(!isAuth) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={s.wrapper}>
            {
                user.avatar
                ? <img src={user.avatar} alt="AVATAR"/>
                : <div className={'avatar'}>{user.name.substring(0, 2)}</div>
            }

            <span>Your Email: {user.email}</span>
            <span>Your NickName: {user.email}</span>
            <span>Date of registration: {registerData}</span>
            <div>
                <SuperButton onClick={handleLogout}>Logout</SuperButton>
            </div>
        </div>
    )
}
