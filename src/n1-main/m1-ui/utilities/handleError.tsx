import {Dispatch} from 'redux';
import {AppReducerActionType, setErrorN} from '../../m2-bll/reducers/appReducer';

export const handleError = (e: any, dispatch: Dispatch<AppReducerActionType>) => {
    const error = e.response ? e.response.data.error : e.message;
    dispatch(setErrorN(error));
}