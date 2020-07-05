import { hourRanges, formatDatetime } from '@/assets/js/common/time';


it('hourRanges', () => {
  expect(hourRanges).toHaveLength(24);
  expect(hourRanges[0]).toBe('00時台');
  expect(hourRanges[9]).toBe('09時台');
  expect(hourRanges[12]).toBe('12時台');
  expect(hourRanges[23]).toBe('23時台');
});


describe('formatDatetime', () => {
  it('2020/01/02 03:04:05.006', () => {
    const format = 'yyyy/MM/dd HH:mm:ss.SSS';
    const datetime = new Date(2020, 0, 2, 3, 4, 5, 6);
    const formated = '2020/01/02 03:04:05.006';

    expect(formatDatetime(datetime, format)).toBe(formated);
  });

  it('2019年12月23日 12時34分45秒123', () => {
    const format = 'yyyy年MM月dd日 HH時mm分ss秒SSS';
    const datetime = new Date(2019, 11, 23, 12, 34, 45, 123);
    const formated = '2019年12月23日 12時34分45秒123';

    expect(formatDatetime(datetime, format)).toBe(formated);
  });
});
