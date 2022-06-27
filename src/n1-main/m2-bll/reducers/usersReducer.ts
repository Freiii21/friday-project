import {ResponseGetUsersType, usersAPI, User2Type} from '../api/users_api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../store';
import {setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';

const initialState: ResponseGetUsersType = {
    users: [{
        avatar: '',
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        updated: '',
        verified: false,
        _id: '',
    }],
    maxPublicCardPacksCount: 0,
    minPublicCardPacksCount: 0,
    page: 1,
    pageCount: 50,
    usersTotalCount: 0,
}
export const usersReducer = (state = initialState, action: UsersRedActionType) => {
    switch (action.type) {
        case 'USER_REDUCER/SET_USERS':
            return {
                ...state, users: action.users, maxPublicCardPacksCount: action.maxPublicCardPacksCount,
                minPublicCardPacksCount: action.minPublicCardPacksCount, usersTotalCount: action.userTotalCount
            };
        default:
            return state;
    }
}
export const setUsers = (users: User2Type[], userTotalCount: number,
                         maxPublicCardPacksCount: number, minPublicCardPacksCount: number) =>
    ({
        type: 'USER_REDUCER/SET_USERS', users, userTotalCount,
        maxPublicCardPacksCount, minPublicCardPacksCount
    } as const);


//thunks
export const getUsers = () =>
    async (dispatch: Dispatch<UsersRedActionType>, getState: () => AppRootStateType) => {
        try {
            const pageCount = getState().users.pageCount;

            dispatch(setLoaderStatus('loading'));
            const res = await usersAPI.getUsers({pageCount});

            dispatch(setUsers(res.data.users, res.data.usersTotalCount,
                res.data.maxPublicCardPacksCount, res.data.minPublicCardPacksCount));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }
export type UsersRedActionType =
    ReturnType<typeof setUsers>
    | ReturnType<typeof setLoaderStatus>
