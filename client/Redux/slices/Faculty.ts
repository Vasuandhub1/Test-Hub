import {createSlice , PayloadAction} from "@reduxjs/toolkit"

// now create the interface for the reducer

interface facul{
    DOB:number,
    Enroll:number,
    branch:string,
    email:string,
    name:string,
    role:string,
}

// creating the initial state
const initialState:facul={
    DOB:Date.now(),
    Enroll:0,
    branch:"",
    email:"",
    name:"",
    role:"",
    }

const FacultySlice = createSlice({
    name:"faculty",
    initialState,
    reducers:{
        setFaculty(state,action:PayloadAction<Facul>){
            return {...state,...action.payload}
        }
    }
}) 


// now export the action s
export const {setFaculty} = FacultySlice.actions
// now export the slice
export default FacultySlice.reducer