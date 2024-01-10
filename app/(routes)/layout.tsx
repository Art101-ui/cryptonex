import MainNav from "@/app/ui/mainnav"

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div>
            <MainNav/>
            <div>
              {children}
            </div>
        </div>
    )
}