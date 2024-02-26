import BottomBar from "./nav/bottombar"
import TopBar from "./nav/topbar"

export default function MainNav(){
    return(
        <div className="">
            <div className= 'bg-[#353570] w-full px-[72px] flex justify-center h-[40px]'>
                <TopBar/>
                
            </div>
            <div className= ' bg-white dark:bg-[#13121A] w-full px-5 md:px-[72px] py-2 sm:py-4  h-[55px] sm:h-[70px]'>
                <BottomBar/>
            </div>
        </div>
    )
}