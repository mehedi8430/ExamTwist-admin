import { NavLink } from "react-router";
import { categories } from "../data";

export default function CategorySidebar() {
  return (
    <div className="lg:col-span-1 rounded-xl p-4 bg-primary/10 max-h-[85vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 px-2">Categories</h2>
      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <NavLink
              key={category.id}
              to={`/dashboard/categories/${category.id}`}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive ? "bg-primary/80 " : "hover:bg-primary/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive
                        ? "bg-primary/80"
                        : "bg-white/10 hover:bg-primary/80"
                    }`}
                  >
                    <Icon className={`size-4`} />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
