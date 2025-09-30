import {
  type ChartConfig,
  ChartContainer,
  ApexChart,
} from "@/components/ui/chart";
import type { ApexOptions } from "apexcharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 329 },
  { month: "August", desktop: 172 },
  { month: "September", desktop: 388 },
  { month: "October", desktop: 144 },
  { month: "November", desktop: 267 },
  { month: "December", desktop: 196 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function RevenueLineLinearInDashboard() {
  const series: ApexOptions["series"] = [
    {
      name: "Desktop",
      data: chartData.map((item) => item.desktop),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.month.slice(0, 3)),
      labels: {
        trim: true,
        hideOverlappingLabels: true,
        style: { colors: "var(--muted-foreground)", fontSize: "12px" },
      },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${Math.floor(val)}`,
        style: { colors: "var(--muted-foreground)", fontSize: "12px" },
        offsetX: -5,
      },
      forceNiceScale: true,
    },
    grid: {
      borderColor: "var(--border)",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    tooltip: {
      enabled: true,
      style: { fontSize: "12px", fontFamily: "inherit" },
      x: { show: false },
      marker: { show: true },
    },
    stroke: {
      curve: "smooth",
      width: 4,
      colors: ["var(--primary)"],
    },
  };

  return (
    <section className="h-full">
      <ChartContainer config={chartConfig} className="h-full">
        <ApexChart type="line" data={series} options={options} height="100%" />
      </ChartContainer>
    </section>
  );
}
