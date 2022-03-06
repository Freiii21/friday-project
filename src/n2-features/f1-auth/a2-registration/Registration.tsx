import s from './Registration.module.css'
import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {RequestStatusType, setRegistered, setRegisteredT} from '../../../n1-main/m2-bll/authReducer';
import {Preloader} from '../../../n1-main/m1-ui/common/Preloader/Preloader';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';

export const Registration = () => {
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(store => store.auth.status)
    const registerStatus = useSelector<AppRootStateType, boolean>(store => store.auth.isRegistered)
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm, setConfirm] = useState<string>("")

    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [confirmError, setConfirmError] = useState<string>("")

    const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmailError("")
        setEmail(e.currentTarget.value)
    };
    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordError("")
        setPassword(e.currentTarget.value)
    };
    const onChangeConfirm = (e:ChangeEvent<HTMLInputElement>) => {
        setConfirmError("")
        setConfirm(e.currentTarget.value)
    };

    const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;
    const emailValidator = (email: string): boolean => emailRegExp.test(email);

    const regUser = () => {
        if(!emailValidator(email)){
            return setEmailError("Email address is invalid!")
        }
        if(password.length < 7){
            return setPasswordError("Password must be 7 characters or more")
        }
        if(confirm!==password){
            return setConfirmError("Passwords do not match")
        }
        dispatch(setRegisteredT({email: email, password: password}))
    };

    const buttonClass = requestStatus === "idle" ? s.button : `${s.button} ${s.buttonDisabled}`;
    const inputClass = requestStatus === "idle" ? s.input : `${s.input} ${s.inputDisabled}`;

    if(registerStatus) return <Navigate to={PATH.LOGIN}/>
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
                           disabled={requestStatus==="loading"}
                           className={inputClass}
                    />
                    {emailError!=="" && <div className={s.error}>{emailError}</div>}
                </div>
                <div>
                    <input type="password"
                           placeholder="Enter password"
                           value={password}
                           onChange={onChangePassword}
                           disabled={requestStatus==="loading"}
                           className={inputClass}
                    />
                    {passwordError!=="" && <div className={s.error}>{passwordError}</div>}
                </div>
                <div>
                    <input type="password"
                           placeholder="Confirm password"
                           value={confirm}
                           onChange={onChangeConfirm}
                           disabled={requestStatus==="loading"}
                           className={inputClass}
                    />
                    {confirmError!=="" && <div className={s.error}>{confirmError}</div>}
                </div>
                <div>
                    <button onClick={regUser} className={buttonClass} disabled={requestStatus==="loading"}>
                        Register
                    </button>
                </div>
            </div>
            {requestStatus==="loading" && <Preloader />}
        </div>
    )
}