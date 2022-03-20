import {Dispatch} from 'redux'

import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';
import {cardsAPI, CardsDataType} from '../api/cards-a-p-i';


const initialState = {
    data: {
        cards: [
            {
                answer: 'none',
                cardsPack_id: 'none',
                comments: 'none',
                created: 'none',
                grade: 0,
                more_id: 'none',
                question: 'none',
                rating: 0,
                shots: 0,
                type: 'none',
                updated: 'none',
                user_id: 'none',
                __v: 0,
                _id: 'none',
            },
        ],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        packUserId: 'none',
        page: 0,
        pageCount: 0,
        token: 'none',
        tokenDeathTime: 0,
    },
    packName:''
}
export const cardsReducer = (state = initialState, action: CardReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, data: action.data,packName: action.packName??''};
        default:
            return state;
    }
}

export const setCardsAC = (data: CardsDataType,packName?:string) =>
    ({type: 'SET_CARDS', data,packName} as const);


//thunks
export const getCardsTC = (page: number, pageCount: number, id: string,packName:string) =>
    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(page, pageCount, id);
            dispatch(setCardsAC(res.data,packName));
        } catch (e) {
             handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }


export const addNewCardTC = (page: number, pageCount: number, idPack: string, question: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.addNewCard(idPack, question);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data))
        } catch (e) {
              handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const deleteCardTC = (page: number, pageCount: number, idCard: string, idPack: string) =>

    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.deleteCard(idCard);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data));
        } catch (e) {
             handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }


export const updateCardTC = (idCard: string, idPack: string, page: number,
                             pageCount: number, question: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            setLoaderStatus('loading');
            await cardsAPI.updateCard(idCard, question);
            const res = await cardsAPI.getCards(page, pageCount, idPack);
            dispatch(setCardsAC(res.data));
        } catch (e) {
              handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }

//types
export type CardReducerActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setErrorN>
type InitialStateType = typeof initialState;