import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import useSidebar from "@/hook/useSidebar";
import { useEffect, useRef } from "react";

export default function Dashboard() {
  const { isVisibleSidebar, setIsVisibleSidebar } = useSidebar();
  const handleRefSidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!handleRefSidebar.current?.contains(event.target as Node | null)) {
        console.log(event);
        setIsVisibleSidebar(!isVisibleSidebar);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <Sidebar refSidebar={handleRefSidebar} />

      <div className="flex-1">
        <Header />
      </div>
    </div>
  );
}
