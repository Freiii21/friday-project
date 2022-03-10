const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    success: null,
}
export const appReducer = (state = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP_REDUCER/SET_LOADER_STATUS':
            return {...state, status: action.status}
        case 'APP_REDUCER/SET_ERROR_N':
            return {...state, error: action.error};
        case 'APP_REDUCER/SET_SUCCESS':
            return {...state, success: action.text};
        default:
            return state;
    }
}

export const setLoaderStatus = (status: StatusType) =>
    ({type: 'APP_REDUCER/SET_LOADER_STATUS', status} as const);
export const setErrorN = (error: string | null) => ({type: 'APP_REDUCER/SET_ERROR_N', error} as const);
export const setSuccess = (text: string | null) => ({type: 'APP_REDUCER/SET_SUCCESS', text} as const);

export type AppReducerActionType =
    ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setErrorN>
    | ReturnType<typeof setSuccess>
export type StatusType = 'idle' | 'loading';
type InitialStateType = {
    status: StatusType;
    error: string | null;
    success: string | null;
}