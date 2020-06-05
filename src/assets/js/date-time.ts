/**
 * Date型をフォーマットする関数
 * @param datetime 日時
 * @param format フォーマット
 */
const formatDateTime = (datetime: Date, format: string) => {
  let formated = format;
  formated = formated.replace(/yyyy/g, `${datetime.getFullYear()}`);
  formated = formated.replace(/MM/g, `0${datetime.getMonth() + 1}`.slice(-2));
  formated = formated.replace(/dd/g, `0${datetime.getDate()}`.slice(-2));
  formated = formated.replace(/HH/g, `0${datetime.getHours()}`.slice(-2));
  formated = formated.replace(/mm/g, `0${datetime.getMinutes()}`.slice(-2));
  formated = formated.replace(/ss/g, `0${datetime.getSeconds()}`.slice(-2));
  formated = formated.replace(/SSS/g, `0${datetime.getMilliseconds()}`.slice(-2));
  return formated;
};


type UnitType = 'year' | 'month' | 'day'


/**
 * 時系列データをまとめるためのクラス
 */
class DateTimeUnit {
  datetime: Date

  unit: UnitType

  /**
   * @param datetime
   * @param unit 時間単位
   */
  constructor(datetime: Date, unit: UnitType) {
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
  addUnit(): void {
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


export { formatDateTime, UnitType, DateTimeUnit };
