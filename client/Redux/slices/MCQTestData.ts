import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//  now create the interface 
interface Ques{
QuesId:string,
ans:number,
index:number
}

interface data {
IsTest:boolean,
TestId:string,
Questions:string[],
ans:Ques[]
}
const initialState:data ={
    IsTest:false,
    TestId:"",
    Questions:[],
    ans:[]
} 

const MCQTestData  = createSlice({
    name:"CodeTestData",
    initialState,
    reducers:{
        StartMCQTest(state,action:PayloadAction<string>){
            state.IsTest=true
            state.TestId=action.payload.TestId
            state.Questions=[...action.payload.Questions]
        },
        AddAns(state,action:PayloadAction<Ques>){
            const data = action.payload
            const temp =[...state.ans]
            temp[data.index]=data
            state.ans=temp
        },
        EndTest(state){
            state.IsTest=false
            state.TestId=""
            state.Questions=[]
        }
    }

})

export const {StartMCQTest,EndTest,AddAns} = MCQTestData.actions
export default MCQTestData.reducer