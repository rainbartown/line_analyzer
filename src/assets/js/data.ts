import { UnitType, DateTimeUnit } from '@/assets/js/date-time';


/**
 * メッセージ
 */
interface Message {
  readonly speaker: string; // 発言者の名前
  readonly datetime: Date; // 発言日時
}


/**
 * 履歴のイベント
 */
interface HistoryEvent {
  readonly type: 'START_TALK' | 'END_TALK' | 'CHANGE_TALK_NAME'; // イベントのタイプ
  readonly datetime: Date; // イベントの日時
  readonly actor?: string; // イベントを起こした人
  readonly newTalkName?: string; // 新しいトーク名
}


/**
 * ソート時のカウントのエントリー
 */
interface CountEntry {
  name: string; // エントリー名
  count: number; // カウント
}


/**
 * キーごとのメッセージ数を数える関数
 * @param messages メッセージのリスト
 * @param keys キーのリスト
 * @param keyFn どのキーのメッセージ数をインクリメントするか返す関数
 * @returns キーごとのメッセージ数
 */
const countMessage = (
  messages: Message[],
  keys: string[],
  keyFn: (message: Message) => string,
): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};
  keys.forEach((key) => {
    counts[key] = 0;
  });
  messages.forEach((message) => {
    counts[keyFn(message)] += 1;
  });
  return counts;
};


/**
 *
 * @param counts カウントのエントリの辞書
 * @param length 出力データリストの最大長（その他を含む）
 *               n < 0 のときはその他としてまとめない（デフォルト: -1）
 */
const sortCounts = (counts: CountEntry[], length = -1) => {
  const sortedCounts = counts.sort((a, b) => b.count - a.count);
  if (length <= 0 || sortedCounts.length <= length) return sortedCounts;
  const tops = sortedCounts.slice(0, length - 1);
  const othersCount = sortedCounts.slice(length - 1)
    .map((el) => el.count)
    .reduce((sum, count) => (sum + count));
  tops.push({ name: 'その他', count: othersCount });
  return tops;
};


/**
 * 時系列のシーケンスを生成
 * startDateTimeからendDateTimeまでunit単位のシーケンス
 * @param startDateTime 開始日時
 * @param endDateTime 終了日時
 * @param unit 時間単位
 */
const generateTimeSequence = (startDateTime: Date, endDateTime: Date, unit: UnitType) => {
  const sequence = [];
  const start = new DateTimeUnit(startDateTime, unit);
  const end = new DateTimeUnit(endDateTime, unit);
  while (start.datetime <= end.datetime) {
    sequence.push(new Date(start.datetime));
    start.addUnit();
  }
  return sequence;
};


export {
  Message,
  HistoryEvent,
  countMessage,
  sortCounts,
  generateTimeSequence,
};
