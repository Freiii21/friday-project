import {Dispatch} from 'redux'
import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';
import {
    cardsAPI,
    CardsDataType,
    CardsType,
    RequestForCardsType,
    RequestToAddCardType,
    RequestToUpdateCardType
} from '../api/cards-a-p-i';
import {AppRootStateType} from '../store';

const initialCard = {
    answer: 'no answer',
    cardsPack_id: 'none',
    comments: 'none',
    created: 'none',
    grade: 0,
    more_id: 'none',
    question: 'no questions',
    rating: 0,
    shots: 0,
    type: 'none',
    updated: 'none',
    user_id: 'none',
    __v: 0,
    _id: 'none',
}
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
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        minGrade: 0,
        maxGrade: 0,
        sortCards: '',
        page: 0,
        pageCount: 10,
    },
    cardsForLearn: [
        initialCard,
    ],
    namePack: 'none',
}
export const cardsReducer = (state = initialState, action: CardReducerActionsType): InitialStateType => {

    switch (action.type) {
        case 'CARDS_REDUCER/SET_CARDS':
            return {...state, data: action.data, packName: action.packName ?? ''};
        case 'CARDS_REDUCER/SET_ID_PACS':
            return {...state, getData: {...state.getData, cardsPack_id: action.idCards}};
        case 'CARDS_REDUCER/SET_CURRENT_PAGE':
            return {...state, getData: {...state.getData, page: action.page}};
        case 'CARDS_REDUCER/SET_SORT_VALUE':
            return {...state, getData: {...state.getData, sortCards: action.sortValue}};
        case 'CARDS_REDUCER/SET_CARDS_FOR_LEARN':
            return {
                ...state,
                data: {...state.data, cardsTotalCount: action.countCards},
                cardsForLearn: action.data, namePack: action.namePack
            };
        default:
            return state;
    }
}

export const setCardsForLearn = (data: CardsType[], countCards: number, namePack: string) =>
    ({type: 'CARDS_REDUCER/SET_CARDS_FOR_LEARN', data, countCards, namePack} as const);
export const setCardsAC = (data: CardsDataType, packName?: string) => ({
    type: 'CARDS_REDUCER/SET_CARDS',
    data,
    packName
} as const);
export const setIdCardsAC = (idCards: string, name: string) => ({
    type: 'CARDS_REDUCER/SET_ID_PACS',
    idCards,
    name
} as const);
export const setCardsCurrentPage = (page: number) => ({type: 'CARDS_REDUCER/SET_CURRENT_PAGE', page} as const);
export const setCardsSortValue = (sortValue: string) => ({type: 'CARDS_REDUCER/SET_SORT_VALUE', sortValue} as const);


//thunks

export const getCardsTC = () =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const data: RequestForCardsType = getState().cards.getData

        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(data);
            dispatch(setCardsAC(res.data));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }
export const getCardsForLearn = (idPack: string, namePack: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards({cardsPack_id: idPack});
            if (res.data.cardsTotalCount) {
                dispatch(setCardsForLearn(res.data.cards, res.data.cardsTotalCount, namePack));
            } else
                dispatch(setCardsForLearn([initialCard], 0, namePack));

        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const addNewCardTC = (dataForAdd: RequestToAddCardType) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const data: RequestForCardsType = getState().cards.getData
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.addNewCard(dataForAdd);
            const res = await cardsAPI.getCards(data);
            dispatch(setCardsAC(res.data))
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const deleteCardTC = (idCard: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const data: RequestForCardsType = getState().cards.getData
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.deleteCard(idCard);
            const res = await cardsAPI.getCards(data);
            dispatch(setCardsAC(res.data));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }


export const updateCardTC = (dataForUpdate: RequestToUpdateCardType) =>
    async (dispatch: Dispatch<CardReducerActionsType>, getState: () => AppRootStateType) => {
        const data: RequestForCardsType = getState().cards.getData
        try {
            setLoaderStatus('loading');
            await cardsAPI.updateCard(dataForUpdate);
            const res = await cardsAPI.getCards(data);
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
    | ReturnType<typeof setCardsForLearn>
type InitialStateType = typeof initialState;