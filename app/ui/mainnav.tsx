import BottomBar from "./nav/bottombar"
import TopBar from "./nav/topbar"

export default function MainNav(){
    return(
        <div className="">
            <div className= 'bg-[#353570] w-full px-[72px] flex justify-center h-[40px]'>
                <TopBar/>
            </div>
            <div className= 'bg-white w-full px-[72px] py-4  h-[80px]'>
                <BottomBar/>
            </div>
        </div>
    )
}