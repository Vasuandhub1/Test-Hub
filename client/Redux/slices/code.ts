// now create the slice \
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// now decler the interface 
interface IntCode{
    code:string
}

// now define the initial value
const initialState:IntCode={
    code:"//write your code here"
} 

// now define the reducer here

const Code = createSlice({
    name:"code",
    initialState,
    reducers:{
        setCode(state,action:PayloadAction<string>){
            state.code=action.payload
        }
    }
})

// now export the actions
export const {setCode}=Code.actions
// now export the reducers
export default Code.reducer