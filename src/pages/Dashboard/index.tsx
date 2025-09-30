import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FullscreenIcon from "@/assets/svgs/gridicons_fullscreen-exit.svg?react";
import { Button } from "@/components/ui/button";
import NewPostIcon from "@/assets/svgs/new post.svg?react";
import CancelIcon from "@/assets/svgs/cancel.svg?react";
import ScheduleIcon from "@/assets/svgs/schedule.svg?react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientCard from "@/components/Cards/ClientCard";
import ReviewCard from "@/components/Cards/ReviewCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import RevenueLineLinearInDashboard from "@/components/Charts/RevenueLineLinearInDashboard";
import PaymentAreaLinearInDashboard from "@/components/Charts/PaymentAreaLinearInDashboard";
import PaymentChartDonutInDashboard from "@/components/Charts/PaymentChartDonutInDashboard";
import { Link } from "react-router";
// import {
//   convertObjectToFormData,
//   logFormData,
// } from "@/utils/convertToFormData";

const DashboardCardTitleBadge = ({
  title,
  path,
}: {
  title: string;
  path: "bookings" | "revenue" | "reviews" | "stats" | "payments";
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="px-4 py-2.5 bg-primary/20 text-primary border border-primary/40 rounded-xl font-semibold">
        {title}
      </div>
      <Link to={`/dashboard/home/overview/${path}`}>
        <Button variant="ghost" className="text-primary">
          <FullscreenIcon className="size-6" />
        </Button>
      </Link>
    </div>
  );
};

const DashboardStatus = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => {
  return (
    <div className="p-4 border rounded-2xl bg-muted space-y-4">
      <h2 className="text-2xl">{title}</h2>
      <div className="flex items-center justify-between text-4xl font-semibold">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const statuses = [
    { title: "New", value: 50, icon: <NewPostIcon /> },
    { title: "Cancel", value: 50, icon: <CancelIcon /> },
    { title: "Reschedule", value: 50, icon: <ScheduleIcon /> },
  ];
  const [active, setActive] = useState<
    "Today" | "Week" | "Month" | "Year" | "Quarter"
  >("Week");

  // const clientsInfo = [];

  // const userData = {
  //   userName: "john_doe",
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john@example.com",
  //   role: "Operation",
  // };

  // const handelSubmit = () => {
  //   const formData = convertObjectToFormData(userData);
  //   logFormData(formData, "User Data");
  // };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-center gap-5">
        <Card>
          <CardHeader>
            <DashboardCardTitleBadge title="Bookings" path="bookings" />
          </CardHeader>
          <CardContent className="flex items-start gap-5">
            <div className="w-[30%] space-y-8">
              {statuses.map((item, i) => (
                <DashboardStatus
                  key={i}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                />
              ))}
            </div>
            <div className="w-[70%]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="ghost" className="text-muted-foreground">
                  See all
                </Button>
              </div>
              <ScrollArea className="h-[24.5rem]">
                <div className="space-y-4">
                  <ClientCard />
                  <ClientCard />
                  <ClientCard />
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DashboardCardTitleBadge title="Revenue" path="revenue" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Button
                variant="secondary"
                className="text-muted-foreground rounded-full"
              >
                Today
              </Button>
            </div>

            <div className="w-full flex items-center gap-4 my-2">
              <div className="w-full p-4 border rounded-2xl bg-muted text-2xl font-semibold flex items-center justify-between">
                <h2>Total Booking</h2>
                <p>50</p>
              </div>
              <div className="w-full p-4 border rounded-2xl bg-muted text-2xl font-semibold flex items-center justify-between">
                <h2>Revenue</h2>
                <p>$510.00</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Revenue</h2>
              <Button
                variant="secondary"
                className="text-muted-foreground rounded-full"
              >
                Today
              </Button>
            </div>

            <div className="h-[17.5rem]">
              <RevenueLineLinearInDashboard />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-fit flex items-center justify-center gap-5">
        <Card className="h-full p-0 pt-6 overflow-hidden">
          <CardHeader>
            <DashboardCardTitleBadge title="Payment" path="reviews" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-10 px-6">
              {["Today", "Week", "Month", "Year", "Quarter"].map((item) => (
                <Button
                  variant="secondary"
                  className={cn(
                    "rounded-full",
                    active === item ? "bg-primary/40 text-black" : "",
                  )}
                  onClick={() =>
                    setActive(
                      item as "Today" | "Week" | "Month" | "Year" | "Quarter",
                    )
                  }
                >
                  {item}
                </Button>
              ))}
            </div>
            <div className="h-[21rem]">
              <PaymentAreaLinearInDashboard
                color="oklch(0.7005 0.1155 44.22)"
                period={active}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <DashboardCardTitleBadge title="Reviews" path="reviews" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Reviews(220)</h3>
              <Button variant="secondary" className="rounded-full">
                4.3 Rattings
              </Button>
            </div>

            <ScrollArea className="h-80">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <DashboardCardTitleBadge title="Payment" path="payments" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Overview</h3>
              <Button variant="secondary" className="rounded-full">
                4.3 Rattings
              </Button>
            </div>
            <div className="h-80">
              <PaymentChartDonutInDashboard />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Button variant="secondary" onClick={handelSubmit}>
        Submit From
      </Button> */}
    </section>
  );
}
