import { NavLink } from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import s from './Header.module.css'

export const Header = () => {

    return (
        <div className={s.all}>
            <NavLink to={PATH.LOGIN} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Registration</NavLink>
            <NavLink to={PATH.PROFILE} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Profile</NavLink>
            <NavLink to={PATH.PAGE_NOT_FOUND} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Page not found</NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Password recovery</NavLink>
            <NavLink to={PATH.CREATING_NEW_PASSWORD} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Create new password</NavLink>
            <NavLink to={PATH.TEST_PAGE} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Test page</NavLink>
        </div>
    )
}