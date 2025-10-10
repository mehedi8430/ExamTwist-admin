import { Navigate } from "react-router";
import { categories } from "../data";

export default function CategoryRouteNavigation() {
  const category = categories[0]?.id;

  return <Navigate to={`/dashboard/categories/${category}`} replace />;
}
