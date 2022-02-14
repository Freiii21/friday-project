import {Dispatch} from 'redux';

type InitialStateType = {
}
const initialState: InitialStateType = {
};

type ActionsType = SomeAT;

export const Reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
}

type SomeAT = {
    type: 'SOME_ACTION'
}

export const someAC = (): SomeAT => ({type: 'SOME_ACTION'});


