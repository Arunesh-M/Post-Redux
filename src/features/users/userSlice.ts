import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = [
    { id: '0', name: 'Dave Peter' },
    { id: '1', name: 'Bran Jordan' },
    { id: '2', name: 'Harry Tuchel' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state:RootState) => state.users;

export default usersSlice.reducer