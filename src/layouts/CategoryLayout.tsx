import CategorySidebar from "@/pages/Dashboard/Categories/components/CategorySidebar";
import { Outlet } from "react-router";

export default function CategoryLayout() {
  return (
    <section className="flex">
      <div className="fixed h-full w-[300px]">
        <CategorySidebar />
      </div>
      <div className="flex-1 ml-[320px]">
        <Outlet />
      </div>
    </section>
  );
}
