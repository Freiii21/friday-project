const initialState: InitialStateType = {
    status: 'idle',
}
export const appReducer = (state = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP_REDUCER/SET_LOADER_STATUS':
            return {...state,status:action.status}
        default:
            return state;
    }
}

export const setLoaderStatus = (status: StatusType) =>
    ({type: 'APP_REDUCER/SET_LOADER_STATUS', status} as const);

type AppReducerActionType = ReturnType<typeof setLoaderStatus>;
export type StatusType = 'idle' | 'loading';
type InitialStateType = {
    status: StatusType;
}