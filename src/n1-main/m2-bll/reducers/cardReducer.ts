import {Dispatch} from 'redux'
import {cardsAPI, CardsDataType} from '../api/cards-a-p-i';
import {setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';


const initialState = {
    data:{}as CardsDataType
}
export const cardsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state,data: action.data};
        default:
            return state;
    }
}

export const setCardsAC = (data: CardsDataType) =>
    ({type: 'SET_CARDS', data} as const);


//thunks
export const getCardsTC = (page: number, pageCount: number, id: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(page, pageCount, id);
            dispatch(setCardsAC(res.data));
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
            dispatch(setCardsAC(res.data))
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
            dispatch(setCardsAC(res.data));
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
            dispatch(setCardsAC(res.data));
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
type InitialStateType=typeof initialState;