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

export {
  countMessage,
};
