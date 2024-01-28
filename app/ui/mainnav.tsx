import axios from "axios";
import { useState, useEffect } from "react";
import BottomBar from "./nav/bottombar"
import TopBar from "./nav/topbar"
import { StatusProps } from "../lib/type";




export default function MainNav(){
    
    
    return(
        <div className="">
            <div className= 'bg-[#353570] w-full px-[72px] flex justify-center h-[40px]'>
                <TopBar/>
            </div>
            <div className= 'bg-white w-full px-[72px] py-4  h-[70px]'>
                <BottomBar/>
            </div>
        </div>
    )
}