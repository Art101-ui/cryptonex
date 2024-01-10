import Image from "next/image"
import Logo from '@/public/Logo.png'
import { GoHomeFill } from "react-icons/go";
import { IoLayersOutline } from "react-icons/io5";
import Input from "../input";
import DropDown from "./dropdown";
import ThemeButton from "./themebutton";



export default function BottomBar(){
    return(
        <div className="flex items-center gap-8 h-full justify-between">
           <div className="flex items-center gap-2">
            <Image 
                src= {Logo}
                alt="logo"
                width={30}
                height={30}
                />
            <h1 className=" text-[21px]">CryptoNex</h1>
           </div>
           <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mr-5">
                    <GoHomeFill/>
                    <h3>Home</h3>
                </div>
                <div className="flex items-center gap-2">
                    <IoLayersOutline/>
                    <h3>Portfolio</h3>
                </div>
           </div>
           <div className="flex h-full gap-4">     
              <Input placeholder="Search..." />
              <DropDown/>
              <ThemeButton/>
           </div>
        </div>
    )
}