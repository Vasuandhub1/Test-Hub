import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

export default function FacultyRoute (){
    const name = useSelector((state:RootState)=>state.faculty.name)
    return(<>
    {name!=""?<Outlet></Outlet>:<Navigate to={"/"}></Navigate>}
    </>)
}