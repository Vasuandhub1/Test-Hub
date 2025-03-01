import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";


export default function StudentRoute(){
    const name = useSelector((state:RootState)=>state.student.name)
    console.log(name,"route")
    return (
        <div>
            {name!=""?<Outlet></Outlet>:<Navigate to={"/"}></Navigate>}
        </div>
    )
}