import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';


export const Profile = () => {




    const isAuth=useSelector<AppRootStateType,boolean>(state => state.auth.isAuth);
    if(!isAuth) return <Navigate to={PATH.LOGIN}/>

    return (
        <div >
           {/* {user.avatar ? <img src={user.avatar} alt="AVATAR"/> : <div className={'avatar'}>{user.name.substring(0, 2)}</div>}

            <span>Your Email: {user.email}</span>
            <span>Your NickName: {user.email}</span>
            <span>Date of registration: {registerData}</span>
            <div>
                <SuperButton onClick={handleLogout}>Logout</SuperButton>
            </div>*/}
        </div>
    )
}
