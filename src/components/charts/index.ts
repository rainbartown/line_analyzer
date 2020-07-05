import DayOfWeekBarChart from './DayOfWeekBarChart.vue';
import HourBarChart from './HourBarChart.vue';
import SenderPieChart from './SenderPieChart.vue';
import TimeSeriesLineChart from './TimeSeriesLineChart.vue';


const chartComponents = {
  DayOfWeekBarChart,
  HourBarChart,
  SenderPieChart,
  TimeSeriesLineChart,
};


type ChartComponent = keyof typeof chartComponents;


export default chartComponents;

export {
  ChartComponent,
  DayOfWeekBarChart,
  HourBarChart,
  SenderPieChart,
  TimeSeriesLineChart,
};
