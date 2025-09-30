import {
  type ChartConfig,
  ChartContainer,
  ApexChart,
} from "@/components/ui/chart";
import type { ApexOptions } from "apexcharts";

const chartData = [
  { category: "Complete", value: 65, color: "#00BCD4" },
  { category: "Pending", value: 35, color: "#FF9800" },
];

const chartConfig = {
  complete: {
    label: "Complete",
    color: "#00BCD4",
  },
  pending: {
    label: "Pending",
    color: "#FF9800",
  },
} satisfies ChartConfig;

export default function PaymentChartDonutInDashboard() {
  // Transform data for ApexCharts donut
  const series = chartData.map((item) => item.value);
  const labels = chartData.map((item) => item.category);
  const colors = chartData.map((item) => item.color);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
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
      height: "100%",
      parentHeightOffset: 0,
    },
    labels: labels,
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              fontWeight: 400,
              color: "var(--muted-foreground)",
              offsetY: -15,
              formatter: () => "Total balance",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--foreground)",
              offsetY: 8,
              formatter: () => "$100.00",
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      formatter: (val: number) => `${Math.round(val)}%`,
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 400,
      labels: {
        colors: "var(--muted-foreground)",
      },
      markers: {
        size: 10,
        strokeWidth: 0,
        shape: "circle",
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    stroke: {
      show: false,
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "darken",
        },
      },
    },
  };

  return (
    <section className="h-full">
      <ChartContainer config={chartConfig} className="h-full">
        <ApexChart type="donut" data={series} options={options} height="100%" />
      </ChartContainer>
    </section>
  );
}
