import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

export const usersAPI = {
    getUsers: (data?:Partial<RequestGetUserType>) =>
        instance.get<Partial<RequestGetUserType>,AxiosResponse<any>>('/social/users',{
            params:data,
        }),
};
export type ResponseGetUsersType={

}
export type RequestGetUserType={
    userName:string;
    min:number;
    max:number;
    sortUsers:string;
    page:number;
    pageCount:number;
}
export type UserType={
    avatar:string;
    created:string;
    email:string;
    isAdmin:boolean;
    name:string;
    publicCardPacksCount:number;
    updated:string;
    verified:boolean;
    id:string;
}