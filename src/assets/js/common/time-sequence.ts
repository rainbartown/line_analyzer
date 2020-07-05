/**
 * 時系列に関する関数
 */


import * as tunit from './time-unit';


/**
 * 開始日時から終了日時（含む）までの時間単位ごとのシーケンスを生成する。
 * @param start 開始日時
 * @param end 終了日時
 * @param unit 時間単位
 * @returns 時間単位ごとの時系列シーケンス
 */
const generateTimeSequence = (start: Date, end: Date, unit: tunit.TimeUnit): Date[] => {
  if (start.getTime() > end.getTime()) throw new Error('終了日時は開始日時以降である必要があります');

  const sequence: Date[] = [];
  const startFloor = tunit.floorTime(start, unit);
  const endFloor = tunit.floorTime(end, unit);

  for (let datetime = startFloor; datetime <= endFloor; datetime = tunit.addUnits(datetime, unit)) {
    sequence.push(datetime);
  }

  return sequence;
};


export {
  generateTimeSequence,
};
