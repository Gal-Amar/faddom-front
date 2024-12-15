import {LineChart} from '@mantine/charts';
import {timePeriods} from "./utils";
import {useEffect, useState} from "react";
import {Title} from "@mantine/core";

export default function CpuDataChart({data, error, timePeriod}) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    setChartData(data.map(item => ({
      time: new Date(item.Timestamp).toLocaleString('en-US', {
        timeZone: 'UTC',
        month: timePeriods[timePeriod] > timePeriods["Last 30 days"] ? '2-digit' : undefined,
        day: timePeriods[timePeriod] > timePeriods["Last 12 hours"] ? '2-digit' : undefined,
        year: timePeriods[timePeriod] > timePeriods["Last 30 days"] ? '2-digit' : undefined,
        hour: '2-digit',
        minute: '2-digit',
        second: timePeriods[timePeriod] < timePeriods["Last 1 minute"] ? '2-digit' : undefined,
        hour12: false,
      }),
      cpuUsage: item.Maximum,
    })));
  }, [data, timePeriod])


  return (
    <div>
      <Title mt={"50px"}>CPU Utilization</Title>
      <LineChart
        mt="xl"
        h={300}
        data={chartData}
        dataKey="time"
        series={[
          {name: 'cpuUsage', color: 'indigo.6'},
        ]}
        curveType="linear"

      />
    </div>
  );
}