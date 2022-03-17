import {Dispatch} from 'redux'
import {cardsAPI} from '../api/cards-a-p-i';
import {setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';


const initialState = {} as CardsDataType
export const cardsReducer = (state: CardsDataType = initialState, action: ActionsType): CardsDataType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, ...action.data, id: action.id};
        default:
            return state;
    }
}

export const setCardsAC = (data: CardsDataType, id: string) =>
    ({type: 'SET_CARDS', data, id} as const);


//thunks
export const getCardsTC = (page: number, pageCount: number, id: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(page, pageCount, id);
            dispatch(setCardsAC(res.data, id));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }


export const addNewCardTC = (page: number, pageCount: number, idPack: string, question: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.addNewCard(idPack, question);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data, idPack))
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const deleteCardTC = (page: number, pageCount: number, idCard: string, idPack: string) =>

    async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.deleteCard(idCard);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data, idPack));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }


export const updateCardTC = (idCard: string, idPack: string, page: number,
                             pageCount: number, question: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        try {
            setLoaderStatus('loading');
            await cardsAPI.updateCard(idCard, question);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data, idPack));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }

//types
export type ActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setLoaderStatus>
export type CardsDataType = {
    cards: CardsType[]
    id: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}