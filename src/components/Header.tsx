import useSidebar from "@/hook/useSidebar";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export function Header() {
  const {isVisibleSidebar,setIsVisibleSidebar} = useSidebar()

  
  
  return (
    <header className={`mx-auto flex h-12 w-full items-center bg-zinc-900 px-6 text-white lg:h-14`}>
      
      <div className="lg:hidden cursor-pointer" onClick={()=>setIsVisibleSidebar(!isVisibleSidebar)}>
        <GiHamburgerMenu className="text-xl" />
      </div>

      <span className="lg:hidden border-r-2 border-white p-4 text-white"></span>
      
    </header>
  );
}
