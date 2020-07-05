import * as group from '@/assets/js/common/group';


describe('groupBy', () => {
  it('偶数・奇数でグループ分け', () => {
    const keyFn = jest.fn((num: number) => (num % 2 === 0 ? 'even' : 'odd'));

    const array = [1, 2, 3, 4, 5];
    const groupMap: group.GroupMap<string, number> = new Map([
      ['odd', [1, 3, 5]],
      ['even', [2, 4]],
    ]);

    expect(group.groupBy(array, keyFn)).toStrictEqual(groupMap);
    expect(keyFn).toHaveBeenCalledTimes(array.length);
  });

  it('配列が空のときは空の連想配列', () => {
    const keyFn = jest.fn();

    const array: [] = [];
    const groupMap = new Map();

    expect(group.groupBy(array, keyFn)).toStrictEqual(groupMap);
    expect(keyFn).toHaveBeenCalledTimes(0);
  });
});


describe('getCountRecords', () => {
  let groupMap: group.GroupMap<string, number>;

  beforeEach(() => {
    groupMap = new Map([
      ['odd', [1, 3, 5]],
      ['even', [2, 4]],
      ['square', [1, 4]],
    ]);
  });

  it('keyArrayがgroupMapのすべてのキーを1回ずつ', () => {
    const keyArray = ['square', 'odd', 'even'];
    const countRecords: group.CountRecord<string>[] = [
      { key: 'square', count: 2 },
      { key: 'odd', count: 3 },
      { key: 'even', count: 2 },
    ];

    expect(group.getCountRecords(keyArray, groupMap)).toStrictEqual(countRecords);
  });

  it('keyArrayがgroupMapの一部のキーを含まない', () => {
    const keyArray = ['odd', 'even'];
    const countRecords: group.CountRecord<string>[] = [
      { key: 'odd', count: 3 },
      { key: 'even', count: 2 },
    ];

    expect(group.getCountRecords(keyArray, groupMap)).toStrictEqual(countRecords);
  });

  it('keyArrayがgroupMapに含まれないキーを持つ', () => {
    const keyArray = ['square', 'odd', 'even', 'perfect'];
    const countRecords: group.CountRecord<string>[] = [
      { key: 'square', count: 2 },
      { key: 'odd', count: 3 },
      { key: 'even', count: 2 },
      { key: 'perfect', count: 0 },
    ];

    expect(group.getCountRecords(keyArray, groupMap)).toStrictEqual(countRecords);
  });
});


describe('sortCountRecordsByCount', () => {
  let countRecords: group.CountRecord<string>[];

  beforeEach(() => {
    countRecords = [
      { key: 'square', count: 3 },
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'perfect', count: 1 },
    ];
  });

  it('昇順', () => {
    const sortedCountRecords: group.CountRecord<string>[] = [
      { key: 'perfect', count: 1 },
      { key: 'square', count: 3 },
      { key: 'even', count: 4 },
      { key: 'odd', count: 5 },
    ];

    expect(group.sortCountRecordsByCount(countRecords, 'ascent')).toStrictEqual(sortedCountRecords);
  });

  it('降順', () => {
    const sortedCountRecords: group.CountRecord<string>[] = [
      { key: 'odd', count: 5 },
      { key: 'even', count: 4 },
      { key: 'square', count: 3 },
      { key: 'perfect', count: 1 },
    ];

    expect(group.sortCountRecordsByCount(countRecords, 'descent'))
      .toStrictEqual(sortedCountRecords);
  });
});
