import { Link, NavLink, useLocation } from "react-router";
import { categories } from "../data";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SearchInput from "@/components/SearchInput";

export default function ManageCategorySidebar() {
  const location = useLocation();

  return (
    <div className="lg:col-span-1 rounded-xl p-4 bg-primary/10 max-h-[85vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 px-2">Manage Categories</h2>
      <div className="space-y-4">
        <Link
          to={{
            pathname: location.pathname,
            search: "?modal=category",
          }}
        >
          <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>

        <SearchInput
          placeholder="Search categories..."
          className="w-full"
          onChange={(value) => console.log(value)}
          value=""
        />
      </div>

      <div className="mt-4 space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/20"
            >
              <NavLink
                to={`/dashboard/categories/${category.id}`}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                <div className={`p-1.5 rounded-lg bg-white/10`}>
                  <Icon className={`size-4`} />
                </div>
                <span className="font-medium text-sm">{category.name}</span>
              </NavLink>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
