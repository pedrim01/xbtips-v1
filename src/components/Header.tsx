import useSidebar from "@/hook/useSidebar";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export function Header() {
  const {isVisibleSidebar,setIsVisibleSidebar} = useSidebar()

  
  
  return (
    <header className={`mx-auto flex h-12 w-full items-center bg-zinc-900 px-6 text-white lg:h-14`}>
      
      <button className="lg:hidden" onClick={()=>setIsVisibleSidebar(!isVisibleSidebar)}>
        <GiHamburgerMenu className="text-xl" />
      </button>

      
      <div className="lg:hidden border h-8 border-r-1 border-zinc-700 py-2 text-white"></div>
    </header>
  );
}
