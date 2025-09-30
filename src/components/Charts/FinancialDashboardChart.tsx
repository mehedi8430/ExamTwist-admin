import type { ApexOptions } from "apexcharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ApexChart,
  ChartContainer,
} from "@/components/ui/chart";

export const description = "Financial dashboard chart";

const chartData = [
  { month: "Jan", price: 186, nasdaq: 12000, russell: 1800 },
  { month: "Feb", price: 305, nasdaq: 12500, russell: 1850 },
  { month: "Mar", price: 237, nasdaq: 12300, russell: 1820 },
  { month: "Apr", price: 273, nasdaq: 12700, russell: 1880 },
  { month: "May", price: 309, nasdaq: 13500, russell: 1950 },
  { month: "Jun", price: 314, nasdaq: 14000, russell: 2000 },
  { month: "Jul", price: 329, nasdaq: 14200, russell: 2020 },
  { month: "Aug", price: 372, nasdaq: 14500, russell: 2050 },
  { month: "Sep", price: 388, nasdaq: 14800, russell: 2080 },
  { month: "Oct", price: 344, nasdaq: 14300, russell: 2030 },
  { month: "Nov", price: 367, nasdaq: 14700, russell: 2070 },
  { month: "Dec", price: 396, nasdaq: 15000, russell: 2100 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
  nasdaq: {
    label: "NASDAQ",
    color: "#4CAF50",
  },
  russell: {
    label: "Russell 2000",
    color: "#F44336",
  },
} satisfies ChartConfig;

export function FinancialDashboardChart() {
  const series: ApexOptions["series"] = [
    {
      name: "Price",
      data: chartData.map((item) => item.price),
    },
    {
      name: "NASDAQ",
      data: chartData.map((item) => item.nasdaq),
    },
    {
      name: "Russell 2000",
      data: chartData.map((item) => item.russell),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.month),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3B82F6", "#4CAF50", "#F44336"],
  };

  // Calculate changes for indicators
  const priceChange =
    chartData[chartData.length - 1].price - chartData[0].price;
  const nasdaqChange =
    chartData[chartData.length - 1].nasdaq - chartData[0].nasdaq;
  const russellChange =
    chartData[chartData.length - 1].russell - chartData[0].russell;

  const pricePercent = ((priceChange / chartData[0].price) * 100).toFixed(2);
  const nasdaqPercent = ((nasdaqChange / chartData[0].nasdaq) * 100).toFixed(2);
  const russellPercent = ((russellChange / chartData[0].russell) * 100).toFixed(
    2
  );

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-2xl font-bold">
              ${chartData[chartData.length - 1].price.toLocaleString()}
            </div>
            <div
              className={`text-sm ${
                priceChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toLocaleString()} ({pricePercent}%)
            </div>
          </div>
          <div className="text-sm text-gray-500">24 June</div>
        </div>

        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ApexChart
              type="line"
              data={series}
              options={options}
              height="100%"
            />
          </ChartContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm">NASDAQ</div>
            <div
              className={`text-lg font-medium ${
                nasdaqChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {nasdaqChange >= 0 ? "+" : ""}
              {nasdaqChange.toLocaleString()}
            </div>
            <div
              className={`text-sm ${
                nasdaqChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {nasdaqPercent}%
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm">Russell 2000</div>
            <div
              className={`text-lg font-medium ${
                russellChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {russellChange >= 0 ? "+" : ""}
              {russellChange.toLocaleString()}
            </div>
            <div
              className={`text-sm ${
                russellChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {russellPercent}%
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm">Volume</div>
            <div className="text-lg font-medium">$39</div>
            <div className="text-sm text-gray-500">24 June</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
