import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

export default function TestRoute (){
    const TestId = useSelector((state:RootState)=>state.CodeTestData.TestId)
    const MCQTest = useSelector((state:RootState)=>state.MCQTestData.TestId)
    return(<>
    {TestId!=""?<Outlet></Outlet>:MCQTest!=""?<Outlet/>:<Navigate to={"/StudentTests"}></Navigate>}
    </>)
}