import { DateTimeUnit } from '@/assets/js/date-time';


/**
 * キーごとのメッセージ数を数える関数
 * @param {Object} messages メッセージリスト
 * @param {string[]} keys キーのリスト
 * @param {(message: Object) => string} keyFn どのキーのメッセージ数をインクリメントするか返す関数
 * @returns {Object.<string, number>} キーごとのメッセージ数
 */
const countMessage = (messages, keys, keyFn) => {
  const counts = {};
  keys.forEach((key) => {
    counts[key] = 0;
  });
  messages.forEach((message) => {
    counts[keyFn(message)] += 1;
  });
  return counts;
};


/**
 * メッセージ数で降順にソートし、
 * 下位をその他としてまとめて長さnのリストを作成
 * @param {Object[]} counts キーごとのメッセージ数のリスト
 * @param {string} counts.name キーの名前
 * @param {number} counts.count メッセージ数
 * @param {number} [length = -1] 出力データリストの最大長（その他を含む）
 *   n < 0のときはその他をしてまとめない
 *   （デフォルト: -1）
 * @returns {{name : string, count : number}[]} キーごとのメッセージ数のリスト
 */
const sortCounts = (counts, length = -1) => {
  const sortedCounts = counts.sort((a, b) => b.count - a.count);
  if (length <= 0 || sortedCounts.length <= length) return sortedCounts;
  const tops = sortedCounts.slice(0, length - 1);
  const othersCount = sortedCounts
    .slice(length - 1)
    .map((el) => el.count)
    .reduce((sum, count) => (sum + count));
  tops.push({ name: 'その他', count: othersCount });
  return tops;
};


/**
 * 時系列のシーケンスを生成
 * startDateTimeからendDateTimeまでunit単位のシーケンス
 * @param {Date} startDateTime 開始日時
 * @param {Date} endDateTime 終了日時
 * @param {string} unit 時間単位（'year'|'month'|'day')
 */
const generateTimeSequence = (startDateTime, endDateTime, unit) => {
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
  countMessage,
  sortCounts,
  generateTimeSequence,
};
