/**
 * 時間に関する変数や関数等を定義
 */


// 曜日の名前
const daysOfWeek: string[] = [
  '日曜日',
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日',
];


// 〇時台の配列
// 00:00-0:59, 01:00-01:59, ..., 23:59
const hourRanges = [...Array(24).keys()].map((hour) => {
  const zeroPaddedHour = `${hour}`.padStart(2, '0');
  return `${zeroPaddedHour}時台`;
});


/**
 * Date型を文字列に変換する関数
 * @param datetime 日時
 * @param format フォーマット
 */
const formatDatetime = (datetime: Date, format: string) => {
  let formated = format;
  formated = formated.replace(/yyyy/g, `${datetime.getFullYear()}`.padStart(4, '0'));
  formated = formated.replace(/MM/g, `${datetime.getMonth() + 1}`.padStart(2, '0'));
  formated = formated.replace(/dd/g, `${datetime.getDate()}`.padStart(2, '0'));
  formated = formated.replace(/HH/g, `${datetime.getHours()}`.padStart(2, '0'));
  formated = formated.replace(/mm/g, `${datetime.getMinutes()}`.padStart(2, '0'));
  formated = formated.replace(/ss/g, `${datetime.getSeconds()}`.padStart(2, '0'));
  formated = formated.replace(/SSS/g, `${datetime.getMilliseconds()}`.padStart(3, '0'));
  return formated;
};


export {
  hourRanges,
  daysOfWeek,
  formatDatetime,
};
