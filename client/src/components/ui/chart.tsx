import { Line, Bar, Pie } from '@ant-design/plots';
import type { LineConfig, BarConfig, PieConfig } from '@ant-design/plots';

interface ChartProps {
  xField: string;
  yField: string;
  graph_type: string;
  data: unknown;
}

const Chart = ({ xField, yField, graph_type, data }: ChartProps) => {
  const config = {
    data,
    padding: 'auto',
    style: {
      backgroundColor: 'white',
    },
  };

  const generateGraph = (type: string) => {
    const val = type.toLowerCase();
    switch (val) {
      case 'pie':
        return (
          <Pie
            {...(config as PieConfig)}
            appendPadding={10}
            angleField={yField}
            colorField={xField}
          />
        );
      case 'bar':
        return (
          <Bar {...(config as BarConfig)} xField={xField} yField={yField} />
        );
      default:
        return (
          <Line {...(config as LineConfig)} xField={xField} yField={yField} />
        );
    }
  };

  return generateGraph(graph_type);
};

export default Chart;
