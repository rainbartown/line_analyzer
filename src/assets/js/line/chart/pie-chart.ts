import palette from 'google-palette';
import * as group from '@/assets/js/common/group';


/**
 * 円グラフのためにグループごとの要素数を数える。
 * その他としてまとめられ、最大レコード数以内にグループ数を抑えられる。
 * @param countRecords カウントレコードの配列
 * @param maxRecordNum 最大レコード数
 *                     グループ連想配列のグループ数がこれ超えると、上位(maxRecordNum - 1)レコードとその他レコードとなる。
 * @returns 最大レコード数以内の降順カウントレコード
 */
const getPieChartCountRecords = (countRecords: group.CountRecord<string>[],
  maxRecordNum: number | null = null): group.CountRecord<string>[] => {
  const sortedCountRecords = group.sortCountRecordsByCount(countRecords, 'descent');

  if (maxRecordNum === null) return sortedCountRecords;
  if (maxRecordNum <= 0) throw new Error('numCountsは1以上の整数である必要があります');
  if (maxRecordNum >= countRecords.length) return sortedCountRecords;

  const topCountRecords = sortedCountRecords.slice(0, maxRecordNum - 1);
  const restCountRecords = sortedCountRecords.slice(maxRecordNum - 1);

  const sumCountsReducer = (acc: number, cur: group.CountRecord<string>) => acc + cur.count;
  const othersCount = restCountRecords.reduce(sumCountsReducer, 0);
  const othersCountRecord = { key: 'その他', count: othersCount };

  const countRecordsGroupedOthers = [...topCountRecords, othersCountRecord];

  return countRecordsGroupedOthers;
};


/**
 * その他レコードを除いたレコードに対応する円グラフの色の配列を取得する。
 * @param countRecords 円グラフ用カウントレコードの配列
 * @returns 円グラフの色の配列
 */
const getPieChartColors = (countRecords: group.CountRecord<string>[]): string[] => {
  const hasOthers = countRecords[countRecords.length - 1].key === 'その他';

  const numRainbowColor = hasOthers ? countRecords.length - 1 : countRecords.length;
  const colors = palette('tol-rainbow', numRainbowColor).reverse().map((hex: string) => `#${hex}`);

  return colors;
};


export {
  getPieChartCountRecords,
  getPieChartColors,
};
