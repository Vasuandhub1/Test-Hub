// now create the new slice for the 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// now create the interface foe the reducer 

interface stud{
    DOB:number,
    Enroll:number,
    branch:string,
    email:string,
    name:string,
    role:string,
    section:string
}

// now create the initial stats
const initialState:stud={
DOB:Date.now(),
Enroll:0,
branch:"",
email:"",
name:"",
role:"",
section:""
}

const StudentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        setStudent(state,action:PayloadAction<stud>){
            return { ...state, ...action.payload }
        }
    }
})

// now exort the actions 
export const {setStudent} = StudentSlice.actions
// now export the slice\
export default StudentSlice.reducer