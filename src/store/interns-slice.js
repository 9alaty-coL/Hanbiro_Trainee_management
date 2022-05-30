import { createSlice } from "@reduxjs/toolkit";

const initialInternsState = [];
  
const internsSlice = createSlice({
    name: 'interns',
    initialState: initialInternsState,
    reducers: {
        add(state, action){
            state.push(action.payload.intern)
            return
        }
    }
})

export default internsSlice
export const internsActions = internsSlice.actions;