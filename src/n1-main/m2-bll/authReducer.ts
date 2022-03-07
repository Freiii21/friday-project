import {authAPI, LoginDataType, UserType} from './app/api';
import {Dispatch} from 'redux';

export type RequestStatusType = 'idle' | 'loading'

const initialAuthState = {
    user: {} as UserType,
    isAuth: false,
    isRegistered: false,
    newRegisteredUser: true,
    status: 'idle' as RequestStatusType,
    registrationError: ""
}

export const authReducer = (state = initialAuthState,
                            action: ActionAuthReducerType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH_REDUCER/SET_LOGIN':
            return {...state, user: action.user, isAuth: action.isAuth};
        case 'AUTH_REDUCER/SET_LOGOUT': {
            return {...state, isAuth: false};
        }
        case 'AUTH_REDUCER/SET_REGISTERED': {
            return {...state,
                isRegistered: action.isRegistered,
                registrationError: action.registrationError,
                newRegisteredUser: action.newRegisteredUser};
        }
        case 'AUTH_REDUCER/SET_REQUESTSTATUS': {
            return {...state, status: action.status};
        }
        default:
            return state;
    }
}

export const setLogin = (user: UserType, isAuth: boolean) => ({type: 'AUTH_REDUCER/SET_LOGIN', user, isAuth} as const);
export const setLogOut = () => ({type: 'AUTH_REDUCER/SET_LOGOUT'} as const);
export const setRegistered = (isRegistered: boolean, registrationError: string, newRegisteredUser: boolean) => {
    return {
        type: 'AUTH_REDUCER/SET_REGISTERED',
        isRegistered,
        registrationError,
        newRegisteredUser
    } as const;
}
export const setRequestStatus = (status: RequestStatusType) => ({type: 'AUTH_REDUCER/SET_REQUESTSTATUS', status} as const);

export const setLoginT = (data: LoginDataType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {

        try {
            const res = await authAPI.login(data);
            dispatch(setLogin(res.data, true));

        } catch (er: any) {

        }

    }

export const setLogoutT = () =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {

        try {
            const res = await authAPI.logOut();
            dispatch(setLogOut());

        } catch (er: any) {
            console.log(er)
        }

    }

export const setRegisteredT = (data: Omit<LoginDataType, 'rememberMe'>) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setRequestStatus("loading"));
            dispatch(setRegistered(false, "", false))
            const res = await authAPI.register(data);
            dispatch(setRegistered(true, "", true))
        } catch (err: any) {
            dispatch(setRegistered(false, err.response.data.error, false))
        }
        finally {
            dispatch(setRequestStatus("idle"))
        }

    }

export type ActionAuthReducerType = ReturnType<typeof setLogin | typeof setLogOut | typeof setRegistered
    | typeof setRequestStatus>
export type InitialAuthStateType = typeof initialAuthState;