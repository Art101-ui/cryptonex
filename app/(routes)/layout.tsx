import MainNav from "@/app/ui/mainnav"
import { Main } from "next/document"
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