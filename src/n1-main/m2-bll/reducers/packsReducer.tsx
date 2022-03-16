import {packsAPI, RequestPacksType, ResponsePacksType} from '../api/api';
import {Dispatch} from 'redux';
import {handleError} from '../../m1-ui/utilities/handleError';
import {setErrorN, setLoaderStatus} from './appReducer';


const initialState = {
    data: {
        cardPacks: [
            {
                _id: 'none',
                user_id: 'none',
                name: 'no Name',
                cardsCount: 0,
                created: 'none',
                update: 'none',
            },
        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    },
    userId:"",
    cardName:""
}
export const packsReducer = (state = initialState, action: PacksReducerActionType): InitialStateType => {

    switch (action.type) {
        case 'PACKS_REDUCER/GET_PACKS':
            return {...state, data: action.data}
        case "PACKS_REDUCER/SET_MAX-MIN_VALUE":
            return {...state, data: {...state.data, minCardsCount: action.min, maxCardsCount: action.max}}
        case "PACKS_REDUCER/SET_USER_ID":
            return {...state, userId: action.id}
        case "PACKS_REDUCER/SET_CARD_NAME":
            return {...state, cardName: action.name}
        default:
            return state;
    }
}

export const getPacks = (data: ResponsePacksType) => ({type: 'PACKS_REDUCER/GET_PACKS', data} as const);
export const setMaxMinValue = (min: number, max: number) => ({
    type: 'PACKS_REDUCER/SET_MAX-MIN_VALUE',
    min,
    max
} as const);
export const setUserID = (id: string) => ({type: 'PACKS_REDUCER/SET_USER_ID', id} as const);
export const setCardsName = (name: string) => ({type: 'PACKS_REDUCER/SET_CARD_NAME', name} as const);

//thunks
export const getPacksCards = (data?: Partial<RequestPacksType>) =>
    async (dispatch: Dispatch<PacksReducerActionType>) => {
        try {
            dispatch(setLoaderStatus('loading'))
            const res = await packsAPI.getPacks(data);
            dispatch(getPacks(res.data))
        } catch (e) {
            // handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }
//types
export type PacksReducerActionType =
    ReturnType<typeof getPacks>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setMaxMinValue>
    | ReturnType<typeof setUserID>
    | ReturnType<typeof setCardsName>
type InitialStateType = typeof initialState;