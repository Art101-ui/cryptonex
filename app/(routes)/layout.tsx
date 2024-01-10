import MainNav from "@/app/ui/mainnav"

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div>
            <div className=" mb-12">
             <MainNav/>
            </div>
            <div>
              {children}
            </div>
        </div>
    )
}