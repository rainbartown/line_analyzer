/**
 * Date型をフォーマットする関数
 * @param {Date} datetime 日時
 * @param {string} format フォーマット
 * @returns {string} フォーマットされた文字列
 */
const formatDateTime = (datetime, format) => {
  let formated = format;
  formated = formated.replace(/yyyy/g, datetime.getFullYear());
  formated = formated.replace(/MM/g, `0${datetime.getMonth() + 1}`.slice(-2));
  formated = formated.replace(/dd/g, `0${datetime.getDate()}`.slice(-2));
  formated = formated.replace(/HH/g, `0${datetime.getHours()}`.slice(-2));
  formated = formated.replace(/mm/g, `0${datetime.getMinutes()}`.slice(-2));
  formated = formated.replace(/ss/g, `0${datetime.getSeconds()}`.slice(-2));
  formated = formated.replace(/SSS/g, `0${datetime.getMilliseconds()}`.slice(-2));
  return formated;
};


/**
 * 時系列データをまとめるためのクラス
 */
class DateTimeUnit {
  /**
   * コンストラクタ
   * @param {Date} datetime
   * @param {string} unit 時間単位（'year'|'month'|'day'）
   */
  constructor(datetime, unit) {
    this.unit = unit;
    switch (this.unit) {
      case 'year':
        this.datetime = new Date(datetime.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case 'month':
        this.datetime = new Date(datetime.getFullYear(), datetime.getMonth(), 1, 0, 0, 0, 0);
        break;
      case 'day':
        this.datetime = new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(),
          0, 0, 0, 0);
        break;
      default:
        throw Error('invalid unit');
    }
  }

  /**
   * unit分時間を進める
   */
  addUnit() {
    switch (this.unit) {
      case 'year':
        this.datetime.setFullYear(this.datetime.getFullYear() + 1);
        break;
      case 'month':
        this.datetime.setMonth(this.datetime.getMonth() + 1);
        break;
      case 'day':
        this.datetime.setDate(this.datetime.getDate() + 1);
        break;
      default:
        throw Error('invalid unit');
    }
  }
}


export { formatDateTime, DateTimeUnit };
