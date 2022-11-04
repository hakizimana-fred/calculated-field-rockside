import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IStates {
    inputField: any
}

const initialState: IStates = {
    inputField: {
        totalanimals: '',
        tentimestotal: '',
         
    },
};

const addSlice = createSlice({
    name: 'inputfields',
    initialState,
    reducers: {
        totalAnimalsAdded: (state, { payload }) => {
            state.inputField.totalanimals = payload
        },

        totalAnimalMultiplied: (state, { payload }) => {
            state.inputField.tentimestotal = payload
        }
    },
});

export const { totalAnimalsAdded, totalAnimalMultiplied } = addSlice.actions;
export const warnings = (state: RootState) => state.inputFields;
export default addSlice.reducer;
