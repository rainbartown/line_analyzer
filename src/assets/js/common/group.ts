/**
 * データの変形
 */


/**
 * グループ連想配列
 * グループ分けされた配列が値の連想配列
 */
type GroupMap<K, T> = Map<K, T[]>;


/**
 * 配列をグループ分けする。
 * @param array 配列
 * @param keyFn グループ分けのためのキーを返す関数
 * @returns グループ連想配列
 */
const groupBy = <K, T>(array: T[], keyFn: (item: T) => K): GroupMap<K, T> => {
  const map: GroupMap<K, T> = new Map<K, T[]>();

  array.forEach((item) => {
    const key = keyFn(item);

    if (!map.has(key)) map.set(key, []);

    // See: https://github.com/eslint/eslint/issues/12822
    // eslint-disable-next-line no-unused-expressions
    map.get(key)?.push(item);
  });

  return map;
};


/**
 * カウントレコード
 */
interface CountRecord<K> {
  key: K;
  count: number;
}


/**
 * グループごとの要素数を数える。
 * @param keyArray キーの配列
 * @param groupMap グループ連想配列
 * @returns カウントレコードの配列
 *          keyArrayと同じ並び順になり、groupMapに存在しない場合はcountは0となる。
 */
const getCountRecords = <K, T>(keyArray: K[], groupMap: GroupMap<K, T>) => {
  const countRecords = keyArray.map((key) => ({
    key,
    count: groupMap.get(key)?.length ?? 0,
  }));

  return countRecords;
};


/**
 * カウントレコードの配列をカウントでソートする。
 * @param countRecords カウントレコードの配列
 * @param order 昇順・降順
 * @returns ソートされたカウントレコードの配列
 */
const sortCountRecordsByCount = <K>(countRecords: CountRecord<K>[], order: 'ascent' | 'descent'):
  CountRecord<K>[] => {
  const sortedCountRecords = [...countRecords];

  if (order === 'ascent') {
    sortedCountRecords.sort((a, b) => a.count - b.count);
  } else {
    sortedCountRecords.sort((a, b) => b.count - a.count);
  }

  return sortedCountRecords;
};


export {
  GroupMap,
  groupBy,
  CountRecord,
  getCountRecords,
  sortCountRecordsByCount,
};
