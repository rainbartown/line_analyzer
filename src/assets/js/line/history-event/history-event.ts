/**
 * 歴史用イベントのインタフェース
 */


import { LineEventBase, LineChangeGroupNameEvent } from '@/assets/js/line/line-event';


/**
 * 歴史イベントの型
 */
type HistoryEvent = LineFirstEvent | LineLastEvent | LineChangeGroupNameEvent;


/**
 * トーク履歴の最初のイベント
 */
interface LineFirstEvent extends LineEventBase {
  readonly type: 'first_event';
}


/**
 * トーク履歴の最後のイベント
 */
interface LineLastEvent extends LineEventBase {
  readonly type: 'last_event';
}


export {
  HistoryEvent,
  LineFirstEvent,
  LineLastEvent,
  LineChangeGroupNameEvent,
};
