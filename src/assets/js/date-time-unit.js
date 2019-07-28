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


export default DateTimeUnit;
