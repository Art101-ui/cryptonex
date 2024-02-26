export default function CoinListHeading(){
    return (
        <ul className="w-full gap-2 px-3 sm:px-5 text-[14px] flex ">
           <li className="  w-1/12 text-center ">#</li> 
           <li className="  w-1/3 ">Name</li> 
           <li className="  w-1/4 text-center ">Price</li> 
           <li className=" md:block hidden  w-1/5 text-center">1h%</li> 
           <li className=" xl:block hidden w-1/5 text-center">24h%</li> 
           <li className=" xl:block hidden w-1/5 text-center">7d%</li> 
           <li className=" sm:block hidden w-1/2 ">24h volume / Market Cap</li> 
           <li className=" lg:block hidden w-1/2 ">Circulating supply / Total supply</li> 
           <li className="  w-1/3 text-center">Last 7d</li> 
        </ul>
    )
}