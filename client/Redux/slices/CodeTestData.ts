import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//  now create the interface 
interface data {
IsTest:boolean,
TestId:string,
Questions:string[]
}
const initialState:data ={
    IsTest:false,
    TestId:"",
    Questions:[]
} 

const CodeTestData  = createSlice({
    name:"CodeTestData",
    initialState,
    reducers:{
        StartTest(state,action:PayloadAction<string>){
            state.IsTest=true
            state.TestId=action.payload.TestId
            state.Questions=[...action.payload.Questions]
        },
        EndTest(state){
            state.IsTest=false
            state.TestId=""
            state.Questions=[]
        }
    }

})

export const {StartTest,EndTest} = CodeTestData.actions
export default CodeTestData.reducer