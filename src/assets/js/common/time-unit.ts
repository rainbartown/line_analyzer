/**
 * 時間単位とそれに関する関数
 */


/**
 * 時間単位
 */
type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';


/**
 * 日時を時間単位で切り捨てる。非破壊。
 * @param datetime 日時
 * @param unit 時間単位
 * @returns 丸められた日時
 */
const floorTime = (datetime: Date, unit: TimeUnit): Date => {
  const floor = new Date(datetime);

  switch (unit) {
    case 'year':
      floor.setMonth(0, 1);
      floor.setHours(0, 0, 0, 0);
      break;
    case 'month':
      floor.setDate(1);
      floor.setHours(0, 0, 0, 0);
      break;
    case 'day':
      floor.setHours(0, 0, 0, 0);
      break;
    case 'hour':
      floor.setMinutes(0, 0, 0);
      break;
    case 'minute':
      floor.setSeconds(0, 0);
      break;
    case 'second':
      floor.setMilliseconds(0);
      break;
    default: // 'millisecond'
      break;
  }

  return floor;
};

/**
 * 日時を時間単位ごとに進める。非破壊。
 * @param datetime 日時
 * @param unit 時間単位
 * @param n 進めるユニット数
 */
const addUnits = (datetime: Date, unit: TimeUnit, n = 1): Date => {
  const date = new Date(datetime);

  switch (unit) {
    case 'year':
      date.setFullYear(date.getFullYear() + n);
      break;
    case 'month':
      date.setMonth(date.getMonth() + n);
      break;
    case 'day':
      date.setDate(date.getDate() + n);
      break;
    case 'hour':
      date.setHours(date.getHours() + n);
      break;
    case 'minute':
      date.setMinutes(date.getMinutes() + n);
      break;
    case 'second':
      date.setSeconds(date.getSeconds() + n);
      break;
    default: // 'millisecond'
      date.setMilliseconds(date.getMilliseconds() + n);
      break;
  }

  return date;
};


export {
  TimeUnit,
  floorTime,
  addUnits,
};
