import App from "@/App";
import CategoryLayout from "@/layouts/CategoryLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthPage from "@/pages/Auth";
import DashboardPage from "@/pages/Dashboard";
import CategoriesPage from "@/pages/Dashboard/Categories";
import CategoryRouteNavigation from "@/pages/Dashboard/Categories/components/CategoryRouteNavigation";
import Messages from "@/pages/Dashboard/Messages";
import Notifications from "@/pages/Dashboard/Notifications";
import ViewProfile from "@/pages/Dashboard/Profile";
import EditProfile from "@/pages/Dashboard/Profile/EditProfile";
import TablesPage from "@/pages/Dashboard/Tables";
import UnderWorking from "@/pages/Dashboard/UnderWorking";
import AddUsersPage from "@/pages/Dashboard/Users/AddUsersPage";
import UsersPage from "@/pages/Dashboard/Users/UsersPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/login",
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/home" replace />,
      },
      {
        path: "/dashboard/home",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/dashboard/tables",
        element: <TablesPage />,
      },
      {
        path: "/dashboard/view-profile",
        element: <ViewProfile />,
      },
      {
        path: "/dashboard/all-notifications",
        element: <Notifications />,
      },
      {
        path: "/dashboard/messages",
        element: <Messages />,
      },
      // users
      {
        path: "/dashboard/users",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/users/all" replace />,
          },
          {
            path: "/dashboard/users/all",
            element: <UsersPage />,
          },
          {
            path: "/dashboard/users/add",
            element: <AddUsersPage />,
          },
        ],
      },
      // students
      {
        path: "/dashboard/students",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/students/all" replace />,
          },
          {
            path: "/dashboard/students/all",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/students/add",
            element: <UnderWorking />,
          },
        ],
      },
      // subscriptions management
      {
        path: "/dashboard/subscriptions",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/subscriptions/all" replace />,
          },
          {
            path: "/dashboard/subscriptions/all",
            element: <UnderWorking />,
          },
        ],
      },
      // Categories
      {
        path: "/dashboard/categories",
        element: <CategoryLayout />,
        children: [
          {
            index: true,
            element: <CategoryRouteNavigation />,
          },
          {
            path: "/dashboard/categories/:categoryId",
            element: <CategoriesPage />,
          },
        ],
      },
      // question management
      {
        path: "/dashboard/questions",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/questions/all" replace />,
          },
          {
            path: "/dashboard/questions/all",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/questions/add",
            element: <UnderWorking />,
          },
        ],
      },
      // model-tests management
      {
        path: "/dashboard/model-tests",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/model-tests/all" replace />,
          },
          {
            path: "/dashboard/model-tests/all",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/model-tests/add",
            element: <UnderWorking />,
          },
        ],
      },
      // Packages Management
      {
        path: "/dashboard/packages",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/packages/all" replace />,
          },
          {
            path: "/dashboard/packages/all",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/packages/add",
            element: <UnderWorking />,
          },
        ],
      },
      // Quota Subscription
      {
        path: "/dashboard/quota-subscription",
        element: <UnderWorking />,
      },
      // Profile
      {
        path: "/dashboard/profile",
        children: [
          {
            path: "/dashboard/profile/preferences",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/profile/personal-info",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/profile/website",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/profile/payment-methods",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/profile/linked-accounts",
            element: <UnderWorking />,
          },
          {
            path: "/dashboard/profile/app-appearance",
            element: <UnderWorking />,
          },
        ],
      },
    ],
  },
]);

export default router;
