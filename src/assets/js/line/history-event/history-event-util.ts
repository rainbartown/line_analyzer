/**
 * LINEトークのイベントに関する簡単なユーティリティ
 */


import { LineEvent, isLineChangeGroupNameEvent } from '@/assets/js/line/line-event';
import * as hevent from './history-event';


/**
 * LINEトークのイベントがトーク履歴の最初のイベントであるか。
 * @param event LINEトークのイベントか歴史イベント
 * @returns トーク履歴の最後のイベントであるか
 */
const isLineFirstEvent = (event: LineEvent | hevent.HistoryEvent):
    event is hevent.LineFirstEvent => (
  event.type === 'first_event');


/**
 * LINEトークのイベントがトーク履歴の最後のイベントであるか。
 * @param event LINEトークのイベントか歴史イベント
 * @returns トーク履歴の最後のイベントであるか
 */
const isLineLastEvent = (event: LineEvent | hevent.HistoryEvent):
    event is hevent.LineFirstEvent => (
  event.type === 'last_event');


/**
 * LINEトークイベントの配列から最初のイベントを取得する。
 * @param events LINEトークイベントの配列
 * @returns 最初のイベント
 *          events が空のときは null
 */
const getLineFirstEvent = (events: LineEvent[]): hevent.LineFirstEvent | null => {
  if (events.length === 0) return null;

  const firstEvent: hevent.LineFirstEvent = {
    type: 'first_event',
    datetime: events[0].datetime,
  };

  return firstEvent;
};


/**
 * LINEトークイベントの配列から最後のイベントを取得する。
 * @param events LINEトークイベントの配列
 * @returns 最後のイベント
 *          events が空のときは null
 */
const getLineLastEvent = (events: LineEvent[]): hevent.LineLastEvent | null => {
  if (events.length === 0) return null;

  const lastEvent: hevent.LineLastEvent = {
    type: 'last_event',
    datetime: events[events.length - 1].datetime,
  };

  return lastEvent;
};


export {
  isLineChangeGroupNameEvent,
  isLineFirstEvent,
  isLineLastEvent,
  getLineFirstEvent,
  getLineLastEvent,
};
