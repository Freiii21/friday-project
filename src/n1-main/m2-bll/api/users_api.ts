import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

export const usersAPI = {
    getUsers: (data?: Partial<RequestGetUserType>) =>
        instance.get<Partial<RequestGetUserType>, AxiosResponse<ResponseGetUsersType>>('/social/users', {
            params: data,
        }),
    getUser: (id: string) => instance.get<string, AxiosResponse<User2Type>>('/social/user',{params:id}),
};
export type ResponseGetUsersType = {
    users: User2Type[];
    maxPublicCardPacksCount: number;
    minPublicCardPacksCount: number;
    page: number;
    pageCount: number;
    usersTotalCount: number;
}
export type RequestGetUserType = {
    userName: string;
    min: number;
    max: number;
    sortUsers: string;
    page: number;
    pageCount: number;
}
export type User2Type = {
    avatar: string;
    created: string;
    email: string;
    isAdmin: boolean;
    name: string;
    publicCardPacksCount: number;
    updated: string;
    verified: boolean;
    _id: string;
}