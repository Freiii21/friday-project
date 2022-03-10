import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

export const authAPI = {
    login: (data: LoginDataType) => instance.post<LoginDataType, AxiosResponse<UserType>>('/auth/login', data),

    getAuthMe: (payload: {}) => instance.post<UserType>('/auth/me', payload),

    register: (data: Omit<LoginDataType, 'rememberMe'>) =>
        instance.post<Omit<LoginDataType, 'rememberMe'>, AxiosResponse<ResponseRegisterDataType>>('/auth/register', data),

    changeUserName: (data: NewNameUserType) => instance.put<NewNameUserType, AxiosResponse<ResponseUpdateUserType>>('/auth/me'),

    logOut: () => instance.delete<ResponseCommonType>('/auth/me'),

    postForgotPassword: (data: ForgotPasswordType) => instance.post<ForgotPasswordType, AxiosResponse<ResponseCommonType>>('auth/forgot', data),

    setNewPassword: (data: NewPasswordType) => instance.post<NewPasswordType, AxiosResponse<ResponseCommonType>>('/auth/set-new-password', data),
}
export const appPing = {
    getPing: () => instance.get<ResponsePingType>('/ping'),
}
export type ResponsePingType = {
    ping: number;
    backTime: number;
    info: string;
}
export type NewPasswordType = {
    password: string;
    resetPasswordToken: string | undefined;
}
export type ForgotPasswordType = {
    email: string;
    from?: string;
    message: string;
}
export type ResponseCommonType = {
    info: string;
    error: string;
}
export type ResponseUpdateUserType = {
    updateUser: UserType;
    error?: string;
}
export type NewNameUserType = {
    name: string;
    avatar: string;
}
export type ResponseRegisterDataType = {
    addedUser: {},
    error?: string;
}
export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
}
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}