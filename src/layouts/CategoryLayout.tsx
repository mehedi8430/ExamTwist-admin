import ManageCategorySidebar from "@/pages/Dashboard/Categories/components/ManageCategorySidebar";
import { Outlet } from "react-router";

export default function CategoryLayout() {
  return (
    <section className="flex">
      <div className="fixed h-full w-[300px]">
        <ManageCategorySidebar />
      </div>
      <div className="flex-1 ml-[320px]">
        <Outlet />
      </div>
    </section>
  );
}
