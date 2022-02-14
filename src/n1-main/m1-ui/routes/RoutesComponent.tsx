import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from '../../../n2-features/f1-auth/a1-login/Login';
import {TestPage} from '../../../n2-features/f0-test/TestPage';
import {Registration} from '../../../n2-features/f1-auth/a2-registration/Registration';
import {Profile} from '../../../n2-features/f1-auth/a3-profile/Profile';
import {PasswordRecovery} from '../../../n2-features/f1-auth/a5-passwordRecovery/PasswordRecovery';
import {CreatingNewPassword} from '../../../n2-features/f1-auth/a6-creatingNewPassword/CreatingNewPassword';
import {PageNotFound} from '../../../n2-features/f1-auth/a4-pageNotFound/PageNotFound';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAGE_NOT_FOUND: '/pageNotFound',
    PASSWORD_RECOVERY: '/passwordRecovery',
    CREATING_NEW_PASSWORD: '/creatingNewPassword',
    TEST_PAGE: '/testPage',

}

export const RoutesComponent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to={PATH.LOGIN} />} />

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.CREATING_NEW_PASSWORD} element={<CreatingNewPassword/>}/>
                <Route path={PATH.TEST_PAGE} element={<TestPage/>}/>

                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}