import App from "@/App";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthPage from "@/pages/Auth";
import DashboardPage from "@/pages/Dashboard";
import AllBookings from "@/pages/Dashboard/AllBookings";
import BookingHistory from "@/pages/Dashboard/BookingHistory";
import CalendarManagement from "@/pages/Dashboard/CalendarManagement";
import ClientProfile from "@/pages/Dashboard/ClientProfile";
import GetInvoice from "@/pages/Dashboard/GetInvoice";
import Invoice from "@/pages/Dashboard/Invoice";
import Messages from "@/pages/Dashboard/Messages";
import Notifications from "@/pages/Dashboard/Notifications";
import OverviewPage from "@/pages/Dashboard/Overview";
import Bookings from "@/pages/Dashboard/Overview/pages/Bookings";
import Payments from "@/pages/Dashboard/Overview/pages/Payments";
import Revenue from "@/pages/Dashboard/Overview/pages/Revenue";
import Reviews from "@/pages/Dashboard/Overview/pages/Reviews";
import Stats from "@/pages/Dashboard/Overview/pages/Stats";
import PaymentHistory from "@/pages/Dashboard/PaymentHistory";
import ViewProfile from "@/pages/Dashboard/Profile";
import EditProfile from "@/pages/Dashboard/Profile/EditProfile";
import Reschedule from "@/pages/Dashboard/Reschedule";
import AddServices from "@/pages/Dashboard/Services/AddServices";
import ReleaseServices from "@/pages/Dashboard/Services/ReleaseServices";
import TablesPage from "@/pages/Dashboard/Tables";
import UnderWorking from "@/pages/Dashboard/UnderWorking";
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
      {
        path: "/dashboard/booking-history",
        element: <BookingHistory />,
      },
      {
        path: "/dashboard/home/overview",
        element: <OverviewPage />,
        children: [
          {
            index: true,
            element: (
              <Navigate to="/dashboard/home/overview/bookings" replace />
            ),
          },
          { path: "/dashboard/home/overview/bookings", element: <Bookings /> },
          { path: "/dashboard/home/overview/Revenue", element: <Revenue /> },
          { path: "/dashboard/home/overview/reviews", element: <Reviews /> },
          { path: "/dashboard/home/overview/stats", element: <Stats /> },
          { path: "/dashboard/home/overview/payments", element: <Payments /> },
        ],
      },
      {
        path: "/dashboard/calendar-management",
        element: <CalendarManagement />,
      },
      {
        path: "/dashboard/bookings",
        children: [
          {
            index: true,
            element: <AllBookings />,
          },
          {
            path: "/dashboard/bookings/reschedule",
            element: <Reschedule />,
          },
          {
            path: "/dashboard/bookings/client-profile",
            element: <ClientProfile />,
          },
          {
            path: "/dashboard/bookings/invoice-create",
            element: <Invoice />,
          },
          {
            path: "/dashboard/bookings/get-invoice",
            element: <GetInvoice />,
          },
        ],
      },
      {
        path: "/dashboard/services",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/services/release" replace />,
          },
          {
            path: "/dashboard/services/release",
            element: <ReleaseServices />,
          },
          {
            path: "/dashboard/services/add",
            element: <AddServices />,
          },
        ],
      },
      {
        path: "/dashboard/payment",
        element: <PaymentHistory />,
      },
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
