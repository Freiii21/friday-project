import {authAPI, LoginDataType, UserType} from './app/app';
import {Dispatch} from 'redux';

export type RequestStatusType = 'idle' | 'loading'

const initialAuthState = {
    user: {} as UserType,
    isAuth: false,
    isRegistered: true,
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
            return {...state, isRegistered: action.isRegistered};
        }
        default:
            return state;
    }
}

export const setLogin = (user: UserType, isAuth: boolean) => ({type: 'AUTH_REDUCER/SET_LOGIN', user, isAuth} as const);
export const setLogOut = () => ({type: 'AUTH_REDUCER/SET_LOGOUT'} as const);
export const setRegistered = (isRegistered: boolean) => ({type: 'AUTH_REDUCER/SET_REGISTERED', isRegistered} as const);

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
            const res = await authAPI.register(data);
        } catch (er: any) {
        }

    }

export type ActionAuthReducerType = ReturnType<typeof setLogin | typeof setLogOut | typeof setRegistered>
export type InitialAuthStateType = typeof initialAuthState;