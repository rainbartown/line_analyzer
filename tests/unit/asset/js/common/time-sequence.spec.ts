import * as tsequence from '@/assets/js/common/time-sequence';
import * as tunit from '@/assets/js/common/time-unit';
import { SpyInstance } from '../../../types';


describe('generateTimeSequence', () => {
  let floorTimeSpy: SpyInstance<typeof tunit.floorTime>;
  let addUnitsSpy: SpyInstance<typeof tunit.addUnits>;

  beforeEach(() => {
    floorTimeSpy = jest.spyOn(tunit, 'floorTime');
    addUnitsSpy = jest.spyOn(tunit, 'addUnits');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2019/10 ~ 2020/03', () => {
    const start = new Date(2019, 9, 15, 12, 34);
    const end = new Date(2020, 2, 15, 12, 34);
    const unit = 'month';
    const sequence = [
      new Date(2019, 9),
      new Date(2019, 10),
      new Date(2019, 11),
      new Date(2020, 0),
      new Date(2020, 1),
      new Date(2020, 2),
    ];

    floorTimeSpy
      .mockReturnValueOnce(new Date(2019, 9))
      .mockReturnValueOnce(new Date(2020, 2));
    addUnitsSpy.mockImplementation((date) => {
      const time = date.getTime();

      switch (time) {
        case new Date(2019, 9).getTime():
          return new Date(2019, 10);
        case new Date(2019, 10).getTime():
          return new Date(2019, 11);
        case new Date(2019, 11).getTime():
          return new Date(2020, 0);
        case new Date(2020, 0).getTime():
          return new Date(2020, 1);
        case new Date(2020, 1).getTime():
          return new Date(2020, 2);
        case new Date(2020, 2).getTime():
          return new Date(2020, 3);
        default:
          throw new Error();
      }
    });

    expect(tsequence.generateTimeSequence(start, end, unit)).toStrictEqual(sequence);
    expect(floorTimeSpy).toHaveBeenCalledTimes(2);
    expect(addUnitsSpy).toHaveBeenCalledTimes(sequence.length);
  });

  it('開始日時と終了日時が同じ', () => {
    const start = new Date(2019, 9, 15, 12, 34);
    const end = new Date(start);
    const unit = 'day';
    const sequence = [new Date(2019, 9, 15)];

    floorTimeSpy.mockReturnValue(new Date(2019, 9, 15));
    addUnitsSpy.mockReturnValue(new Date(2019, 9, 16));

    expect(tsequence.generateTimeSequence(start, end, unit)).toStrictEqual(sequence);
    expect(floorTimeSpy).toHaveBeenCalledTimes(2);
    expect(addUnitsSpy).toHaveBeenCalledTimes(sequence.length);
  });

  it('終了日時が開始日時より前だとエラー', () => {
    const start = new Date(2019, 9, 15, 12, 34);
    const end = new Date(2019, 2, 15, 12, 34);
    const unit = 'month';
    const errorMessage = '終了日時は開始日時以降である必要があります';

    expect(() => tsequence.generateTimeSequence(start, end, unit)).toThrow(errorMessage);
  });
});
