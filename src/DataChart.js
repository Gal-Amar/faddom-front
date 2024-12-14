import {LineChart} from '@mantine/charts';


export default function CpuDataChart({data}) {
  return (
    <LineChart
      mt="xl"
      h={300}
      data={data}
      dataKey="date"
      series={[
        {name: 'Apples', color: 'indigo.6'},
        {name: 'Oranges', color: 'blue.6'},
        {name: 'Tomatoes', color: 'teal.6'},
      ]}
      curveType="linear"
    />
  );
}