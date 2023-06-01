import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <Sidebar />

      <div className="flex-1">
        <Header />
      </div>

    </div>
  );
}
