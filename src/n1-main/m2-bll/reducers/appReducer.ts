const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}
export const appReducer = (state = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP_REDUCER/SET_LOADER_STATUS':
            return {...state, status: action.status}
        case 'APP_REDUCER/SET_ERROR_N':
            return {...state, error: action.error};
        default:
            return state;
    }
}

export const setLoaderStatus = (status: StatusType) =>
    ({type: 'APP_REDUCER/SET_LOADER_STATUS', status} as const);
export const setErrorN = (error: string|null) => ({type: 'APP_REDUCER/SET_ERROR_N', error} as const);

export type AppReducerActionType =
    ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setErrorN>
export type StatusType = 'idle' | 'loading';
type InitialStateType = {
    status: StatusType;
    error: string | null;
}