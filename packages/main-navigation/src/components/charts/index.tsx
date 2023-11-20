import {
  Line,
  Column,
  ColumnConfig,
  Area,
  LineConfig,
  AreaConfig,
  PieConfig,
  Pie,
} from '@ant-design/charts';


export type ChartTypes = 'line' | 'column' | 'area' | 'pie';
interface BaseChartProps {
  x?: string;
  y?: string;
  groupBy?: string;
  data?: any[];
}

interface BasePieChartProps {
  data?: any[];
  value?: string;
  legend?: string;
}

interface LineChartProps extends BaseChartProps {
  config?: Omit<LineConfig, 'data'>;
}

interface ColumnChartProps extends BaseChartProps {
  config?: Omit<ColumnConfig, 'data'>;
}

interface AreaChartProps extends BaseChartProps {
  config?: Omit<AreaConfig, 'data'>;
}

interface PieChartProps extends BasePieChartProps {
  config?: Omit<PieConfig, 'data' | 'angleField' | 'colorField'>;
}

type HighChartProps<T extends ChartTypes> = { type: T } & (T extends 'line'
    ? LineChartProps
    : T extends 'column'
        ? ColumnChartProps
        : T extends 'area'
            ? AreaChartProps
            : PieChartProps);

interface ChartViewProps {
  model: string; // 表名
  showToolBar?: boolean;
}

// 函数用于格式化图表基本属性
const formatChartBasicAttr = (data: BaseChartProps) => {
  // 定义一个结果对象
  const res = {
    // 数据
    data: data.data || [],
    // x轴字段
    xField: data.x || '',
    // y轴字段
    yField: data.y || '',
    // 分组字段
    seriesField: data.groupBy || '',
  };
  // 返回结果对象
  return res;
};



export function LineChart(props: LineChartProps) {
  const defaultConfig: LineConfig = {
    ...props.config,
    ...formatChartBasicAttr(props),
  };
  return <Line {...defaultConfig} />;
}

export function ColumnChart(props: ColumnChartProps) {
  const defaultConfig: ColumnConfig = {
    isGroup: true,
    ...props.config,
    ...formatChartBasicAttr(props),
  };

  return <Column {...defaultConfig} />;
}

export function AreaChart(props: AreaChartProps) {
  const defaultConfig: AreaConfig = {
    ...props.config,
    ...formatChartBasicAttr(props),
  };
  return <Area {...defaultConfig} />;
}

export function PieChart(props: PieChartProps) {
  const basicProps = {
    data: props.data || [],
    angleField: props.value || '',
    colorField: props.legend || '',
  };
  const defaultConfig: PieConfig = {
    padding: [20, 0],
    ...props.config,
    ...basicProps,
  };

  return <Pie {...defaultConfig} />;
}

export function UnkownChart() {
  return <div>unkown chart</div>;
}

export function HighChart<T extends ChartTypes>(props: HighChartProps<T>) {
  const chart: { [key: string]: React.ComponentType<any> } = {
    line: LineChart,
    column: ColumnChart,
    area: AreaChart,
    pie: PieChart,
  };

  const ChartComponent = chart[props.type] || LineChart;

  const defaultProps = {
    smooth: true,
    ...props
  }
  // @ts-ignore
  return <ChartComponent {...defaultProps} />;
}
