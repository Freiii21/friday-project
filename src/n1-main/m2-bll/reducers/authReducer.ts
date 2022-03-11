import {authAPI, ForgotPasswordType, LoginDataType, NewPasswordType, UserType} from '../api/api';
import {Dispatch} from 'redux';
import {setErrorN, setIsSent, setLoaderStatus, setSuccess} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';

const initialAuthState = {
    user: {} as UserType,
    isAuth: false,
    isRegistered: false,
}

export const authReducer = (state = initialAuthState,
                            action: ActionAuthReducerType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH_REDUCER/SET_LOGIN':
            return {...state, user: action.user, isAuth: action.isAuth};
        case 'AUTH_REDUCER/SET_LOGOUT': {
            return {...state, isAuth: false};
        }
        case 'AUTH_REDUCER/SET_REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state;
    }
}


export const setLogin = (user: UserType, isAuth: boolean) => ({
    type: 'AUTH_REDUCER/SET_LOGIN', user, isAuth
} as const);
export const setLogOut = () => ({type: 'AUTH_REDUCER/SET_LOGOUT'} as const);
export const setRegistered = (isRegistered: boolean) =>
    ({type: 'AUTH_REDUCER/SET_REGISTERED', isRegistered} as const);

//thunks
export const setLoginT = (data: LoginDataType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {

        try {
            dispatch(setLoaderStatus('loading'))
            const res = await authAPI.login(data);
            dispatch(setLogin(res.data, true));
            if (res) {
                dispatch(setSuccess('login is successful'));
                dispatch(setRegistered(true));
            }

        } catch (er: any) {
            handleError(er, dispatch);
            dispatch(setRegistered(false));
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }

export const setLogoutT = () =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.logOut();
            dispatch(setLogOut());
            if (res.data.info) {
                dispatch(setSuccess(res.data.info));
                dispatch(setRegistered(false));
            }

        } catch (e: any) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }

export const setRegisteredT = (data: Omit<LoginDataType, 'rememberMe'>) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.register(data);
            dispatch(setRegistered(true));
            if (res.data) {
                dispatch(setSuccess('registration is successful. Please log in.'))
            }
        } catch (err: any) {
            handleError(err, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }

export const passwordRecoveryTC = (data: ForgotPasswordType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.postForgotPassword(data);
            if (res.data.info) {
                dispatch(setSuccess(res.data.info));
                dispatch(setIsSent(true));
            }
        } catch (err: any) {
            handleError(err, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
            dispatch(setIsSent(false));
        }

    };
export const createNewPassword = (date: NewPasswordType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.setNewPassword(date);
            if (res.data.info) {
                dispatch(setSuccess(res.data.info));
            }
        } catch (e: any) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const checkAuthMeTC = (payload: {}) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.getAuthMe(payload);
            dispatch(setLogin(res.data, true));
            if (res) {
                dispatch(setSuccess('authorization is successful'))
            }
        } catch (e: any) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export type ActionAuthReducerType =
    ReturnType<typeof setLogin>
    | ReturnType<typeof setLogOut>
    | ReturnType<typeof setRegistered>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setErrorN>
    | ReturnType<typeof setSuccess>
    | ReturnType<typeof setIsSent>
export type InitialAuthStateType = typeof initialAuthState;












