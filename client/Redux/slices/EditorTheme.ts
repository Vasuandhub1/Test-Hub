// create the new slice for the 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// define the interface 
interface EdTheme {
    Theme:string
}
const initialState:EdTheme={
    Theme:"vs-dark"
};
// now declear the reducer 
const EditorTheme =  createSlice({
    name:"EditorTheme",
    initialState,
    reducers:{
        setEditor(state,action:PayloadAction<string>){
            state.Theme = action.payload
        }
    }
})

// now export the actions
export const {setEditor} = EditorTheme.actions;
// now export the reducer 
export default EditorTheme.reducer