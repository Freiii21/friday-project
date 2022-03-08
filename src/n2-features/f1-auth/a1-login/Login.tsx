import o from './Login.module.css';
import {AddFormLogin} from './AddFormLogin';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RequestStatusType, setRegistered} from '../../../n1-main/m2-bll/authReducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';

export const Login = () => {
    const newRegisteredUser = useSelector<AppRootStateType, boolean>(store => store.auth.newRegisteredUser)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRegistered(false, '', newRegisteredUser))
    }, [])

    return (
        <div className={o.wrapper}>
            <AddFormLogin/>
            {newRegisteredUser &&
            <span className={o.newUser}>Registration is successful. Please enter your email and password.</span>}
        </div>
    )
}
