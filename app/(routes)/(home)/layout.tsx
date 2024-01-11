import clsx from "clsx"


type ButtonProps ={
    children: React.ReactNode,
    page: string
}

export default function Layout({children}:{children:React.ReactNode}){

    
    return(
        <div className=" px-[72px] ">
            <div className=" bg-white flex w-[450px] h-[45px] rounded-md mb-6">
                <Button page='coin'>Coins</Button>
                <Button page='converter'>Converter</Button>
            </div>
            <div>
              {children}
            </div>
        </div>
    )
}


function Button({children, page}:ButtonProps){
   return(
     <button className={clsx("flex justify-center items-center hover:bg-blue-700 w-1/2 h-full font-bold py-3 px-4 rounded-md",
       {'bg-[#6161D6] text-white' : page ==='coin'},
       {' text-[#6161D6]' : page ==='converter'}
     )}>
        {children}
     </button>
   )
}