import DayOfWeekTable from './DayOfWeekTable.vue';
import HourTable from './HourTable.vue';
import SenderTable from './SenderTable.vue';


const tableComponents = {
  DayOfWeekTable,
  HourTable,
  SenderTable,
};


type TableComponent = keyof typeof tableComponents;


export default tableComponents;

export {
  TableComponent,
  DayOfWeekTable,
  HourTable,
  SenderTable,
};
