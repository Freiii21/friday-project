import {authAPI, LoginDataType, UserType} from './app/app';
import {Dispatch} from 'redux';

const initialAuthState = {
    user: {} as UserType,
    isAuth: false,
}

export const authReducer = (state = initialAuthState,
                            action: ActionAuthReducerType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH_REDUCER/SET_LOGIN':
            return {...state, user: action.user, isAuth: action.isAuth};

        case 'AUTH_REDUCER/SET_LOGOUT': {
            return {...state, isAuth: false};
        }
        default:
            return state;
    }
}

export const setLogin = (user: UserType, isAuth: boolean) => ({type: 'AUTH_REDUCER/SET_LOGIN', user, isAuth} as const);
export const setLogOut = () => ({type: 'AUTH_REDUCER/SET_LOGOUT'} as const);

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

export type ActionAuthReducerType = ReturnType<typeof setLogin | typeof setLogOut>
export type InitialAuthStateType = typeof initialAuthState;