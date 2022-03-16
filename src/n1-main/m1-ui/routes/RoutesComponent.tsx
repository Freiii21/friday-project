import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from '../../../n2-features/f1-auth/a1-login/Login';
import {CreatingNewPassword} from '../../../n2-features/f1-auth/a6-creatingNewPassword/CreatingNewPassword';
import {PageNotFound} from '../../../n2-features/f1-auth/a4-pageNotFound/PageNotFound';
import {PasswordRecoveryMI} from '../../../n2-features/f1-auth/a5-passwordRecovery/PasswordRecoveryMI';
import {CheckEmail} from '../../../n2-features/f1-auth/a5-passwordRecovery/CheckEmail';
import {RegistrationMI} from '../../../n2-features/f1-auth/a2-registration/RegistrationMI';
import Container from '@mui/material/Container';
import {ProfileMI} from '../../../n2-features/f1-auth/a3-profile/ProfileMI';
import {TestPageMI} from '../../../n2-features/f0-test/TestPageMI';
import {ListCard} from "../cards/ListCard";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAGE_NOT_FOUND: '/pageNotFound',
    PASSWORD_RECOVERY: '/passwordRecovery',
    CREATING_NEW_PASSWORD: '/creatingNewPassword/:token',
    TEST_PAGE: '/testPage',
    CHECK_EMAIL: '/checkEmail',
    CARDS: '/cards',
}

export const RoutesComponent = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<RegistrationMI/>}/>
                <Route path={PATH.PROFILE} element={<ProfileMI/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryMI/>}/>
                <Route path={PATH.CREATING_NEW_PASSWORD} element={<CreatingNewPassword/>}/>
                <Route path={PATH.TEST_PAGE} element={<TestPageMI/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.CARDS} element={<ListCard/>}/>

                <Route path="*" element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
            </Routes>
        </Container>
    )
}