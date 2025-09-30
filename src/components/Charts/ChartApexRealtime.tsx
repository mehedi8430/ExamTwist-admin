import React from "react";
import type { ApexOptions } from "apexcharts";
import {
  type ChartConfig,
  ChartContainer,
  ApexChart,
} from "@/components/ui/chart";

export const description = "A dynamic updating line chart";

// Sample data generation functions
const XAXISRANGE = 777600000; // Range for x-axis
let lastDate = 0;
let data: Array<{ x: number; y: number }> = [];

// Initialize data
const initializeData = () => {
  const baseTime = new Date("11 Feb 2017 GMT").getTime();
  const series = [];

  for (let i = 0; i < 30; i++) {
    const x = baseTime + i * 60000; // 1 minute intervals
    const y = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
    series.push({ x, y });
  }

  data = series;
  lastDate = series[series.length - 1].x;
  return series;
};

const getNewSeries = (
  baseval: number,
  { min, max }: { min: number; max: number }
) => {
  const newDate = baseval + 60000; // Add 1 minute
  lastDate = newDate;

  // Remove first element and add new one
  data.shift();
  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  });
};

const chartConfig = {
  realtime: {
    label: "Realtime Data",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartApexRealtime({
  color = "var(--chart-1)",
}: {
  color?: string;
}) {
  const [state, setState] = React.useState(() => {
    const initialData = initializeData();

    return {
      series: [
        {
          name: "Realtime Data",
          data: initialData,
        },
      ],
      options: {
        chart: {
          id: "realtime",
          background: "transparent",
          height: 350,
          type: "line" as const,
          animations: {
            enabled: true,
            dynamicAnimation: {
              enabled: true,
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
          colors: [color],
        },
        title: {
          text: "Dynamic Updating Chart",
          align: "left",
        },
        markers: {
          size: 0,
          colors: [color],
          strokeColors: color,
          strokeWidth: 2,
        },
        xaxis: {
          type: "datetime",
          range: XAXISRANGE,
          labels: {
            datetimeUTC: false,
          },
        },
        yaxis: {
          max: 100,
          min: 0,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          borderColor: "#e0e0e0",
          strokeDashArray: 0,
          position: "back",
        },
        colors: [color],
      } satisfies ApexOptions,
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      getNewSeries(lastDate, { min: 10, max: 90 });

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Realtime Data",
            data: [...data],
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer config={chartConfig}>
      <ApexChart
        type="line"
        data={state.series}
        options={state.options}
        height={350}
      />
    </ChartContainer>
  );
}
