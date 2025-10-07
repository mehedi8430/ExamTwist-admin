import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  FileQuestion,
  BookOpen,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  description?: string;
};

const StatCard = ({
  title,
  value,
  change,
  icon,
  description,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        <div className="flex items-center text-xs">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

type ActivityItem = {
  id: number;
  type: "success" | "warning" | "error" | "info";
  message: string;
  time: string;
};

const ActivityFeed = ({ activities }: { activities: ActivityItem[] }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest updates from your system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="mt-0.5">{getIcon(activity.type)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-relaxed">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type QuickStat = {
  label: string;
  value: number;
  total: number;
  color: string;
};

const QuickStats = ({ stats }: { stats: QuickStat[] }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Question Bank Status</CardTitle>
        <CardDescription>
          Distribution of questions by difficulty
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stat.label}</span>
                <span className="text-muted-foreground">
                  {stat.value} / {stat.total}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${stat.color} transition-all duration-500`}
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                {Math.round((stat.value / stat.total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type TopItem = {
  name: string;
  count: number;
  percentage: number;
};

const TopPerformers = ({
  title,
  items,
  type,
}: {
  title: string;
  items: TopItem[];
  type: string;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Most popular {type} this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-semibold">{item.count}</p>
                <p className="text-xs text-muted-foreground">
                  {item.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const [stats] = useState({
    totalUsers: { value: 12543, change: 12.5 },
    totalStudents: { value: 8932, change: 8.3 },
    totalQuestions: { value: 45678, change: 15.2 },
    activeTests: { value: 234, change: -3.1 },
    totalRevenue: { value: "৳1,24,567", change: 23.4 },
    activeSubscriptions: { value: 3421, change: 18.7 },
    totalPackages: { value: 45, change: 5.2 },
    avgCompletionTime: { value: "24 min", change: -8.3 },
  });

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: "success",
      message: 'New user "Ahmed Hassan" registered successfully',
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: '120 students completed "SSC Math Mock Test"',
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "warning",
      message: 'Package "Premium HSC" subscription expiring for 15 users',
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "success",
      message: 'New model test "Physics Chapter 5" published',
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "error",
      message: 'Payment failed for user "Rahim Khan"',
      time: "3 hours ago",
    },
    {
      id: 6,
      type: "info",
      message: "350+ new questions added to question bank",
      time: "5 hours ago",
    },
  ];

  const questionStats: QuickStat[] = [
    {
      label: "Easy Questions",
      value: 15234,
      total: 45678,
      color: "bg-green-500",
    },
    {
      label: "Medium Questions",
      value: 20123,
      total: 45678,
      color: "bg-yellow-500",
    },
    {
      label: "Hard Questions",
      value: 10321,
      total: 45678,
      color: "bg-red-500",
    },
  ];

  const topSubjects: TopItem[] = [
    { name: "Mathematics", count: 12543, percentage: 85 },
    { name: "Physics", count: 9876, percentage: 72 },
    { name: "Chemistry", count: 8234, percentage: 65 },
    { name: "Biology", count: 7654, percentage: 58 },
    { name: "English", count: 6543, percentage: 52 },
  ];

  const topPackages: TopItem[] = [
    { name: "SSC Complete Package", count: 3421, percentage: 90 },
    { name: "HSC Science Bundle", count: 2876, percentage: 75 },
    { name: "University Admission Pro", count: 2234, percentage: 68 },
    { name: "Job Preparation Basic", count: 1987, percentage: 55 },
    { name: "Premium All Access", count: 1543, percentage: 45 },
  ];

  return (
    <section className="space-y-6 bg-background">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your exam platform today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.value.toLocaleString()}
          change={stats.totalUsers.change}
          icon={<Users className="h-5 w-5" />}
          description="All registered users"
        />
        <StatCard
          title="Active Students"
          value={stats.totalStudents.value.toLocaleString()}
          change={stats.totalStudents.change}
          icon={<GraduationCap className="h-5 w-5" />}
          description="Currently enrolled"
        />
        <StatCard
          title="Total Questions"
          value={stats.totalQuestions.value.toLocaleString()}
          change={stats.totalQuestions.change}
          icon={<FileQuestion className="h-5 w-5" />}
          description="In question bank"
        />
        <StatCard
          title="Active Tests"
          value={stats.activeTests.value}
          change={stats.activeTests.change}
          icon={<BookOpen className="h-5 w-5" />}
          description="Ongoing examinations"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue.value}
          change={stats.totalRevenue.change}
          icon={<DollarSign className="h-5 w-5" />}
          description="This month"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions.value.toLocaleString()}
          change={stats.activeSubscriptions.change}
          icon={<Activity className="h-5 w-5" />}
          description="Paid subscribers"
        />
        <StatCard
          title="Total Packages"
          value={stats.totalPackages.value}
          change={stats.totalPackages.change}
          icon={<Package className="h-5 w-5" />}
          description="Available packages"
        />
        <StatCard
          title="Avg. Completion Time"
          value={stats.avgCompletionTime.value}
          change={stats.avgCompletionTime.change}
          icon={<Clock className="h-5 w-5" />}
          description="Per test"
        />
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-4">
          <ActivityFeed activities={recentActivities} />
        </div>
        <div className="col-span-full lg:col-span-3">
          <QuickStats stats={questionStats} />
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <TopPerformers
          title="Top Subjects"
          items={topSubjects}
          type="subjects"
        />
        <TopPerformers
          title="Popular Packages"
          items={topPackages}
          type="packages"
        />
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>
            Frequently used administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group">
              <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-2" />
              <span className="text-sm font-medium">Add User</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group">
              <FileQuestion className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-2" />
              <span className="text-sm font-medium">Add Question</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group">
              <BookOpen className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-2" />
              <span className="text-sm font-medium">Create Test</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group">
              <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-2" />
              <span className="text-sm font-medium">New Package</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
