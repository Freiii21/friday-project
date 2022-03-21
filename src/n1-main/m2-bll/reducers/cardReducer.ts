import {Dispatch} from 'redux'
import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';
import {cardsAPI, CardsDataType} from '../api/cards-a-p-i';
import {AppRootStateType} from "../store";


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
    packName: '',
    getData: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        minGrade: 0,
        maxGrade: 0,
        sortCards: "",
        page: 0,
        pageCount: 10,
    }
}
export const cardsReducer = (state = initialState, action: CardReducerActionsType): InitialStateType => {

    switch (action.type) {
        case 'CARDS_REDUCER/SET_CARDS':
            return {...state, data: action.data, packName: action.packName ?? ''};
        case 'CARDS_REDUCER/SET_ID_PACS':
            return {...state, getData: {...state.getData, cardsPack_id: action.idCards}};
        case 'CARDS_REDUCER/SET_CURRENT_PAGE':
            return {...state, getData: {...state.getData, page:action.page}};
        case 'CARDS_REDUCER/SET_SORT_VALUE':
            return {...state, getData: {...state.getData, sortCards: action.sortValue}};
        default:
            return state;
    }
}

export const setCardsAC = (data: CardsDataType, packName?: string) => ({type: 'CARDS_REDUCER/SET_CARDS', data, packName} as const);
export const setIdCardsAC = (idCards:string,name:string) => ({type: 'CARDS_REDUCER/SET_ID_PACS', idCards,name} as const);
export const setCardsCurrentPage = (page:number) => ({type: 'CARDS_REDUCER/SET_CURRENT_PAGE', page} as const);
export const setCardsSortValue = (sortValue:string) => ({type: 'CARDS_REDUCER/SET_SORT_VALUE', sortValue} as const);


//thunks
export const getCardsTC = () =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const {cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount} = getState().cards.getData
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount,);
            dispatch(setCardsAC(res.data));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }


export const addNewCardTC = (page: number, pageCount: number, idPack: string, question: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const {cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount} = getState().cards.getData
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.addNewCard(idPack, question);
            const res = await cardsAPI.getCards(cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount,);
            dispatch(setCardsAC(res.data))
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const deleteCardTC = (page: number, pageCount: number, idCard: string, idPack: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const {cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount} = getState().cards.getData
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.deleteCard(idCard);
            const res = await cardsAPI.getCards(cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount,);
            dispatch(setCardsAC(res.data));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }


export const updateCardTC = (idCard: string, idPack: string, page: number,
                             pageCount: number, question: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const {cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount} = getState().cards.getData
        try {
            setLoaderStatus('loading');
            await cardsAPI.updateCard(idCard, question);
            const res = await cardsAPI.getCards(cardAnswer, cardQuestion,cardsPack_id, minGrade, maxGrade, sortCards, page, pageCount,);
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
    | ReturnType<typeof setIdCardsAC>
    | ReturnType<typeof setCardsCurrentPage>
    | ReturnType<typeof setCardsSortValue>
type InitialStateType = typeof initialState;