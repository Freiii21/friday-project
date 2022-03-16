import {RequestPacksType, ResponsePacksType} from '../api/api';
import {Dispatch} from 'redux';
import {handleError} from '../../m1-ui/utilities/handleError';
import {setErrorN, setLoaderStatus, setSuccess} from './appReducer';


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
       cardPacksTotalCount: +0,
       maxCardsCount: 0,
       minCardsCount: 0,
       page: 0,
       pageCount: 0,
   }
}
export const packsReducer = (state = initialState, action: PacksReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS_REDUCER/GET_PACKS':
            return {...state,data: action.data}
        default:
            return state;
    }
}

export const getPacks = (data: ResponsePacksType) => ({type: 'PACKS_REDUCER/GET_PACKS', data} as const);

//thunks
/*export const getPacksCards = (data?: Partial<RequestPacksType>) =>
    async (dispatch: Dispatch<PacksReducerActionType>) => {
        try {
            dispatch(setLoaderStatus('loading'))
            const res = await getPacks(data);
            dispatch(getPacks(res.data))
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }*/
//types
export type PacksReducerActionType =
    ReturnType<typeof getPacks>
    | ReturnType<typeof setLoaderStatus>
type InitialStateType=typeof initialState;