import type { ApexOptions } from "apexcharts";
import {
  type ChartConfig,
  ChartContainer,
  ApexChart,
} from "@/components/ui/chart";

export const description = "A linear area chart with dynamic time periods";

type TimePeriod = "Today" | "Week" | "Month" | "Year" | "Quarter";

// Mock data for different time periods
const mockData = {
  Today: [
    { label: "12 AM", value: 45 },
    { label: "3 AM", value: 32 },
    { label: "6 AM", value: 28 },
    { label: "9 AM", value: 65 },
    { label: "12 PM", value: 89 },
    { label: "3 PM", value: 125 },
    { label: "6 PM", value: 98 },
    { label: "9 PM", value: 76 },
  ],
  Week: [
    { label: "Mon", value: 186 },
    { label: "Tue", value: 305 },
    { label: "Wed", value: 237 },
    { label: "Thu", value: 173 },
    { label: "Fri", value: 209 },
    { label: "Sat", value: 214 },
    { label: "Sun", value: 156 },
  ],
  Month: [
    { label: "Week 1", value: 1200 },
    { label: "Week 2", value: 1500 },
    { label: "Week 3", value: 980 },
    { label: "Week 4", value: 1350 },
  ],
  Quarter: [
    { label: "Jan", value: 4500 },
    { label: "Feb", value: 5200 },
    { label: "Mar", value: 4800 },
  ],
  Year: [
    { label: "Q1", value: 14500 },
    { label: "Q2", value: 16200 },
    { label: "Q3", value: 15800 },
    { label: "Q4", value: 17200 },
  ],
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaLinearProps {
  color: string;
  period: TimePeriod;
}

export default function PaymentAreaLinearInDashboard({
  color,
  period,
}: ChartAreaLinearProps) {
  // Get data based on selected period
  const chartData = mockData[period];

  // Transform data for ApexCharts
  const series: ApexOptions["series"] = [
    {
      name: "Clients",
      data: chartData.map((item) => item.value),
    },
  ];

  // Dynamic tooltip formatting based on period
  const getTooltipFormatter = (period: TimePeriod) => {
    switch (period) {
      case "Today":
        return (val: number) => `${val} clients`;
      case "Week":
        return (val: number) => `${val} clients`;
      case "Month":
        return (val: number) => `${val} clients`;
      case "Quarter":
        return (val: number) => `${val} clients`;
      case "Year":
        return (val: number) => `${val} clients`;
      default:
        return (val: number) => `${val}`;
    }
  };

  // Dynamic marker settings based on period
  const getMarkerSettings = (period: TimePeriod) => {
    const baseSettings = {
      colors: [color],
      strokeColors: color,
      strokeOpacity: 0.2,
    };

    switch (period) {
      case "Today":
        return { ...baseSettings };
      case "Week":
        return { ...baseSettings };
      case "Month":
        return { ...baseSettings };
      case "Quarter":
        return { ...baseSettings };
      case "Year":
        return { ...baseSettings };
      default:
        return { ...baseSettings };
    }
  };

  const options: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      height: "100%",
      parentHeightOffset: 0,
      offsetX: 0,
      offsetY: 0,
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      area: {
        fillTo: "end",
      },
    },
    markers: getMarkerSettings(period),
    xaxis: {
      categories: chartData.map((item) => item.label),
      labels: {
        show: true,
        style: {
          colors: "var(--muted-foreground)",
          fontSize: "12px",
          fontWeight: 400,
        },
        rotate: 0,
        hideOverlappingLabels: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [color],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [color],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100],
      },
      colors: [color],
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "var(--border)",
      strokeDashArray: 3,
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
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: getTooltipFormatter(period),
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: true,
      },
    },
    annotations: {},
  };

  return (
    <div className="h-full w-full">
      <ChartContainer config={chartConfig} className="h-full">
        <ApexChart type="area" data={series} options={options} height="100%" />
      </ChartContainer>
    </div>
  );
}
