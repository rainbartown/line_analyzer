import { getPieChartCountRecords, getPieChartColors } from '@/assets/js/line/chart/pie-chart';
import * as group from '@/assets/js/common/group';
import { SpyInstance } from '../../../../types';


describe('getPieChartCountRecords', () => {
  let countRecords: group.CountRecord<string>[];
  let sortedCountRecords: group.CountRecord<string>[];

  let sortCountRecordsByCountSpy: SpyInstance<typeof group.sortCountRecordsByCount>;

  beforeEach(() => {
    countRecords = [
      { key: 'even', count: 4 },
      { key: 'odd', count: 5 },
      { key: 'perfect', count: 1 },
      { key: 'square', count: 3 },
    ];
    sortedCountRecords = [
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'square', count: 3 },
      { key: 'perfect', count: 1 },
    ];

    sortCountRecordsByCountSpy = jest.spyOn(group, 'sortCountRecordsByCount');
    sortCountRecordsByCountSpy.mockReturnValue(sortedCountRecords);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('numRecordsを指定しなければその他としてまとめない', () => {
    const pieChartCountRecords = sortedCountRecords;

    expect(getPieChartCountRecords(countRecords)).toStrictEqual(pieChartCountRecords);
  });

  it('numRecordsがグループ数より大きいならばその他としてまとめない', () => {
    const numRecords = 5;
    const pieChartCountRecords = sortedCountRecords;

    expect(getPieChartCountRecords(countRecords, numRecords)).toStrictEqual(pieChartCountRecords);
  });

  it('numRecordsがグループ数と等しいならばその他としてまとめない', () => {
    const numRecords = 4;
    const pieChartCountRecords = sortedCountRecords;

    expect(getPieChartCountRecords(countRecords, numRecords)).toStrictEqual(pieChartCountRecords);
  });

  it('numRecordsが3なら上位2レコードとその他レコード', () => {
    const numRecords = 3;
    const pieChartCountRecords: group.CountRecord<string>[] = [
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'その他', count: 4 },
    ];

    expect(getPieChartCountRecords(countRecords, numRecords)).toStrictEqual(pieChartCountRecords);
  });

  it('numRecordsが1ならその他レコード', () => {
    const numRecords = 1;
    const pieChartCountRecords: group.CountRecord<string>[] = [
      { key: 'その他', count: 13 },
    ];

    expect(getPieChartCountRecords(countRecords, numRecords)).toStrictEqual(pieChartCountRecords);
  });

  it('numRecordsが0ならエラー', () => {
    const numRecords = 0;
    const errorMessage = 'numCountsは1以上の整数である必要があります';

    expect(() => getPieChartCountRecords(countRecords, numRecords)).toThrow(errorMessage);
  });
});


describe('getPieChartColors', () => {
  it('その他レコードがないときはレコード数と一致', () => {
    const countRecords = [
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'square', count: 3 },
      { key: 'perfect', count: 1 },
    ];

    expect(getPieChartColors(countRecords)).toHaveLength(countRecords.length);
  });

  it('その他レコードがあるときレコード数より1つ少ない', () => {
    const countRecords = [
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'その他', count: 4 },
    ];

    expect(getPieChartColors(countRecords)).toHaveLength(countRecords.length - 1);
  });
});
