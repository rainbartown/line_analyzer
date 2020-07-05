import { LineEvent } from '@/assets/js/line/line-event';
import { HistoryEvent } from './history-event';
import * as heutil from './history-event-util';


/**
 * LINEトークイベントの配列から歴史イベントの配列を作成する。
 * @param events LINEトークイベントの配列
 * @returns 歴史イベントの配列
 */
const getHistoryEvents = (events: LineEvent[]): HistoryEvent[] => {
  const historyEvents: HistoryEvent[] = [];

  // グループ名変更
  const changeGroupNameEvents = events.filter(heutil.isLineChangeGroupNameEvent);
  historyEvents.push(...changeGroupNameEvents);

  // トークの始まり
  const firstEvent = heutil.getLineFirstEvent(events);
  if (firstEvent !== null) historyEvents.unshift(firstEvent);

  // トークの終わり
  const lastEvent = heutil.getLineLastEvent(events);
  if (lastEvent !== null) historyEvents.push(lastEvent);

  return historyEvents;
};


export default getHistoryEvents;
