import ForceAuthentication from "@/components/ForceAuthentication";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import useSidebar from "@/hook/useSidebar";
import { useEffect, useRef } from "react";

export default function Dashboard() {
  const { isVisibleSidebar, setIsVisibleSidebar } = useSidebar();
  const handleRefSidebar = useRef<HTMLDivElement>(null);

  const handler = (event: MouseEvent) => {
    if (event.x > 257 && isVisibleSidebar && !handleRefSidebar.current?.contains(event.target as Node | null)) {
      // console.log(event);
      // console.log(isVisibleSidebar)
      setIsVisibleSidebar(!isVisibleSidebar);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isVisibleSidebar]);

  return (
    <ForceAuthentication>
      <div className="flex h-screen w-screen flex-col lg:flex-row">
        <Sidebar refSidebar={handleRefSidebar} />

        <div className="flex-1">
          <Header />
        </div>
      </div>
    </ForceAuthentication>
  );
}
