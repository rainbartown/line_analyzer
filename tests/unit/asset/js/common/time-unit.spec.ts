import * as tunit from '@/assets/js/common/time-unit';


describe('tunit.floorDatetime', () => {
  let datetime: Date;

  beforeEach(() => {
    datetime = new Date(2019, 1, 23, 12, 34, 56, 123);
  });

  it('非破壊を確認', () => {
    const unit: tunit.TimeUnit = 'year';
    const datetimeTime = datetime.getTime();

    tunit.floorTime(datetime, unit);

    expect(datetime.getTime()).toStrictEqual(datetimeTime);
  });

  it('年', () => {
    const unit: tunit.TimeUnit = 'year';
    const floor = new Date(2019, 0);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('月', () => {
    const unit: tunit.TimeUnit = 'month';
    const floor = new Date(2019, 1, 1);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('日', () => {
    const unit: tunit.TimeUnit = 'day';
    const floor = new Date(2019, 1, 23);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('時', () => {
    const unit: tunit.TimeUnit = 'hour';
    const floor = new Date(2019, 1, 23, 12, 0);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('分', () => {
    const unit: tunit.TimeUnit = 'minute';
    const floor = new Date(2019, 1, 23, 12, 34);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('秒', () => {
    const unit: tunit.TimeUnit = 'second';
    const floor = new Date(2019, 1, 23, 12, 34, 56);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });

  it('ミリ秒', () => {
    const unit: tunit.TimeUnit = 'millisecond';
    const floor = new Date(2019, 1, 23, 12, 34, 56, 123);

    expect(tunit.floorTime(datetime, unit)).toStrictEqual(floor);
  });
});


describe('addUnits', () => {
  let datetime: Date;

  beforeEach(() => {
    datetime = new Date(2019, 1, 23, 12, 34, 56, 123);
  });

  it('非破壊を確認', () => {
    const unit: tunit.TimeUnit = 'year';
    const datetimeTime = datetime.getTime();

    tunit.addUnits(datetime, unit);

    expect(datetime.getTime()).toBe(datetimeTime);
  });

  it('年: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'year';
    const added = new Date(2020, 1, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('年: n = 100', () => {
    const unit: tunit.TimeUnit = 'year';
    const n = 100;
    const added = new Date(2119, 1, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('年: n = -100', () => {
    const unit: tunit.TimeUnit = 'year';
    const n = -100;
    const added = new Date(1919, 1, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('月: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'month';
    const added = new Date(2019, 2, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('月: n = 100', () => {
    const unit: tunit.TimeUnit = 'month';
    const n = 100;
    const added = new Date(2027, 5, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('月: n = -100', () => {
    const unit: tunit.TimeUnit = 'month';
    const n = -100;
    const added = new Date(2010, 9, 23, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('日: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'day';
    const added = new Date(2019, 1, 24, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('日: n = 100', () => {
    const unit: tunit.TimeUnit = 'day';
    const n = 100;
    const added = new Date(2019, 5, 3, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('日: n = -100', () => {
    const unit: tunit.TimeUnit = 'day';
    const n = -100;
    const added = new Date(2018, 10, 15, 12, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('時: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'hour';
    const added = new Date(2019, 1, 23, 13, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('時: n = 100', () => {
    const unit: tunit.TimeUnit = 'hour';
    const n = 100;
    const added = new Date(2019, 1, 27, 16, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('時: n = -100', () => {
    const unit: tunit.TimeUnit = 'hour';
    const n = -100;
    const added = new Date(2019, 1, 19, 8, 34, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('分: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'minute';
    const added = new Date(2019, 1, 23, 12, 35, 56, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('分: n = 100', () => {
    const unit: tunit.TimeUnit = 'minute';
    const n = 100;
    const added = new Date(2019, 1, 23, 14, 14, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('分: n = -100', () => {
    const unit: tunit.TimeUnit = 'minute';
    const n = -100;
    const added = new Date(2019, 1, 23, 10, 54, 56, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('秒: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'second';
    const added = new Date(2019, 1, 23, 12, 34, 57, 123);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('秒: n = 100', () => {
    const unit: tunit.TimeUnit = 'second';
    const n = 100;
    const added = new Date(2019, 1, 23, 12, 36, 36, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('秒: n = -100', () => {
    const unit: tunit.TimeUnit = 'second';
    const n = -100;
    const added = new Date(2019, 1, 23, 12, 33, 16, 123);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('ミリ秒: nを省略（n = 1）', () => {
    const unit: tunit.TimeUnit = 'millisecond';
    const added = new Date(2019, 1, 23, 12, 34, 56, 124);

    expect(tunit.addUnits(datetime, unit)).toStrictEqual(added);
  });

  it('ミリ秒: n = 1234', () => {
    const unit: tunit.TimeUnit = 'millisecond';
    const n = 1234;
    const added = new Date(2019, 1, 23, 12, 34, 57, 357);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });

  it('ミリ秒: n = -1234', () => {
    const unit: tunit.TimeUnit = 'millisecond';
    const n = -1234;
    const added = new Date(2019, 1, 23, 12, 34, 54, 889);

    expect(tunit.addUnits(datetime, unit, n)).toStrictEqual(added);
  });
});
