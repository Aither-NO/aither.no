"use client";
import { Card, DataList } from "@radix-ui/themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  {
    name: "00",
    sunExposure: 1052,
  },
  {
    name: "02",
    sunExposure: 1512,
  },
  {
    name: "04",
    sunExposure: 2001,
  },
  {
    name: "06",
    sunExposure: 2283,
  },
  {
    name: "08",
    sunExposure: 1897,
  },
  {
    name: "10",
    sunExposure: 3590,
  },
  {
    name: "12",
    sunExposure: 5592,
  },
  {
    name: "14",
    sunExposure: 4692,
  },
  {
    name: "16",
    sunExposure: 2594,
  },
  {
    name: "18",
    sunExposure: 2025,
  },
  {
    name: "20",
    sunExposure: 1913,
  },
  {
    name: "22",
    sunExposure: 1206,
  },
];

export function SunChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--amber-7)"
        />
        <XAxis dataKey="name" />
        <Tooltip
          contentStyle={{
            background: "var(--ui-2)",
          }}
          wrapperClassName="rt-Text"
          content={({ active, label, payload }) => {
            if (!active || !label || !payload?.length) {
              return null;
            }
            return (
              <Card>
                <DataList.Root orientation="vertical">
                  <DataList.Item>
                    <DataList.Label>{label}</DataList.Label>
                    <DataList.Value>
                      {payload[0].value}
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="sunExposure"
          stroke="var(--yellow-8)"
          fill="var(--yellow-a8)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
