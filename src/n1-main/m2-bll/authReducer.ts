import {authAPI, LoginDataType, UserType} from './app/app';
import {Dispatch} from 'redux';

const initialAuthState={
    user:{}as UserType,
    isAuth:false,
}

export const authReducer = (state=initialAuthState,action:ActionAuthReducerType):InitialAuthStateType => {
  switch (action.type) {
      case 'AUTH_REDUCER/SET_LOGIN':
          return {...state,user: action.user,isAuth: action.isAuth};
      default:return state;
  }
}

export const setLogin = (user:UserType,isAuth:boolean) => ({type:'AUTH_REDUCER/SET_LOGIN',user,isAuth}as const);

export const setLoginT = (data:LoginDataType) =>
    async (dispatch:Dispatch<ActionAuthReducerType>)=>{
    const res=await authAPI.login(data);
    if(res.data._id){
        dispatch(setLogin(res.data,true));
    }
    }

export type ActionAuthReducerType=ReturnType<typeof setLogin>
export type InitialAuthStateType=typeof initialAuthState;