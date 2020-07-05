import LineChangeGroupNameEventHistoryItem from './LineChangeGroupNameEventHistoryItem.vue';
import LineFirstEventHistoryItem from './LineFirstEventHistoryItem.vue';
import LineLastEventHistoryItem from './LineLastEventHistoryItem.vue';


const historyItemComponents = {
  LineChangeGroupNameEventHistoryItem,
  LineFirstEventHistoryItem,
  LineLastEventHistoryItem
} as const;


type HistoryItemComponent = keyof typeof historyItemComponents;


export default historyItemComponents;


export {
  HistoryItemComponent,
  LineChangeGroupNameEventHistoryItem,
  LineFirstEventHistoryItem,
  LineLastEventHistoryItem,
}
