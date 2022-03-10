import s from './Registration.module.css'
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {setRegistered, setRegisteredT} from '../../../n1-main/m2-bll/reducers/authReducer';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import yeyForHidePassword from './../../../assets/eye.png'
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';

export const Registration = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRegistered(false, '', false));
    }, [dispatch])

    const requestStatus = useTypedSelector(state => state.app.status)
    const registerStatus = useSelector<AppRootStateType, boolean>(store => store.auth.isRegistered)
    const registrationError = useSelector<AppRootStateType, string>(store => store.auth.errorText)


    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)

    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [confirmError, setConfirmError] = useState<string>('')

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailError('')
        setEmail(e.currentTarget.value)
    };
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordError('')
        setPassword(e.currentTarget.value)
    };
    const onChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmError('')
        setConfirm(e.currentTarget.value)
    };
    const onShowPassword = (hide: boolean) => {
        setShowPassword(hide)
    };
    const onShowConfirm = (hide: boolean) => {
        setShowConfirm(hide)
    };
    const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;
    const emailValidator = (email: string): boolean => emailRegExp.test(email);

    const regUser = () => {
        if (!emailValidator(email)) {
            return setEmailError('Email address is invalid!')
        }
        if (password.length < 8) {
            return setPasswordError('Password must be more than 7 characters')
        }
        if (confirm !== password) {
            return setConfirmError('Passwords do not match')
        }
        dispatch(setRegisteredT({email: email, password: password}))
    };

    const buttonClass = requestStatus === 'idle' ? s.button : `${s.button} ${s.buttonDisabled}`;
    const inputClass = requestStatus === 'idle' ? s.input : `${s.input} ${s.inputDisabled}`;

    if (registerStatus) return <Navigate to={PATH.LOGIN}/>
    return (
        <div className={s.common}>
            <div className={s.regWindow}>
                <div className={s.text}>
                    <span>It-incubator</span>
                </div>
                <div className={s.text2}>
                    <span>Sign Up</span>
                </div>
                <div>
                    <input type="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={onChangeEmail}
                           disabled={requestStatus === 'loading'}
                           className={inputClass}
                    />
                    {emailError !== '' && <div className={s.error}>{emailError}</div>}
                </div>
                <div>
                    {!showPassword
                        ? <input type="password"
                                 placeholder="Enter password"
                                 value={password}
                                 onChange={onChangePassword}
                                 disabled={requestStatus === 'loading'}
                                 className={inputClass}
                        />
                        : <input type="text"
                                 placeholder="Enter password"
                                 value={password}
                                 onChange={onChangePassword}
                                 disabled={requestStatus === 'loading'}
                                 className={inputClass}
                        />
                    }
                    <img src={yeyForHidePassword}
                         className={s.hiddenPassword}
                         alt={'eye'}
                         onClick={() => onShowPassword(!showPassword)}
                    />
                    {passwordError !== '' && <div className={s.error}>{passwordError}</div>}
                </div>
                <div>
                    {!showConfirm
                        ? <input type="password"
                                 placeholder="Confirm password"
                                 value={confirm}
                                 onChange={onChangeConfirm}
                                 disabled={requestStatus === 'loading'}
                                 className={inputClass}
                        />
                        : <input type="text"
                                 placeholder="Confirm password"
                                 value={confirm}
                                 onChange={onChangeConfirm}
                                 disabled={requestStatus === 'loading'}
                                 className={inputClass}
                        />
                    }
                    <img src={yeyForHidePassword}
                         className={s.hiddenPassword}
                         alt={'eye'}
                         onClick={() => onShowConfirm(!showConfirm)}
                    />
                    {confirmError !== '' && <div className={s.error}>{confirmError}</div>}
                </div>
                <div>
                    <button onClick={regUser} className={buttonClass} disabled={requestStatus === 'loading'}>
                        Register
                    </button>
                </div>
            </div>
            {/* {requestStatus === 'loading' && <Preloader/>}*/}
            {registrationError !== '' && <div className={s.error}>Registation error: {registrationError}</div>}
        </div>
    )
}