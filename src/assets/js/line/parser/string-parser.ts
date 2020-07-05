/**
 * トーク履歴ファイルの読み込みに利用する文字列パーサー
 */


/**
 * トーク履歴ファイルの先頭行からトーク名を取得する。
 * @param line トーク履歴ファイルの先頭行
 * @returns トーク名
 *          失敗したときは null
 */
const parseTalkNameLine = (line: string): string | null => {
  const pattern = /^\[LINE\] (?<talkName>.*)のトーク履歴/; // '[LINE] <talkName>のトーク履歴'

  const talkName = line.match(pattern)?.groups?.talkName;

  if (talkName === undefined) return null;

  return talkName;
};


/**
 * トーク履歴ファイルの2行目からトーク履歴の保存日時を取得する。
 * @param line トーク履歴ファイルの2行目
 * @returns トーク履歴の保存日時
 *          失敗したときは null
 */
const parseExportDatetimeLine = (line: string): Date | null => {
  const pattern = /^保存日時：(?<year>20[0-9][0-9])\/(?<month>[0-1][0-9])\/(?<dayOfMonth>[0-3][0-9]) (?<hour>[0-2][0-9]):(?<minute>[0-5][0-9])$/; // 例: '保存日時：2019/01/01 00:00'

  const groups = line.match(pattern)?.groups;

  if (groups === undefined) return null;

  const year = parseInt(groups.year, 10);
  const month = parseInt(groups.month, 10) - 1; // 月はDateに合わせて0-11
  const dayOfMonth = parseInt(groups.dayOfMonth, 10);
  const hour = parseInt(groups.hour, 10);
  const minute = parseInt(groups.minute, 10);
  const datetime = new Date(year, month, dayOfMonth, hour, minute);

  return datetime;
};


/**
 * 日付の文字列のパーサーを作成する。
 * 正規表現が呼び出しごとにコンパイルされてパフォーマンスが低下するのを防ぐためにクロージャにしている。
 * @returns 日付パーサー
 */
const buildDateStringParser = () => {
  const pattern = /^(?<year>20[0-9][0-9])\/(?<month>[0-1][0-9])\/(?<dayOfMonth>[0-3][0-9])\(.\)$/; // 例: '2019/01/01(火)'

  const parser = (date: string): [number, number, number] | null => {
    const groups = date.match(pattern)?.groups;
    if (groups === undefined) return null;

    const year = parseInt(groups.year, 10);
    const month = parseInt(groups.month, 10) - 1; // 月はDateに合わせて0-11
    const dayOfMonth = parseInt(groups.dayOfMonth, 10);

    return [year, month, dayOfMonth];
  };

  return parser;
};


/**
 * 日付の文字列から年・月・日を取得する。
 * @param date 日付の文字列
 *             例: '2019/01/01(火)'
 * @returns [年, 月, 日]
 *          月は0-11, 日は1-31
 *          例: '2019/01/01(火)' -> [2019, 0, 1]
 *          失敗したときはnull
 */
const parseDateString = buildDateStringParser();


/**
 * 時刻の文字列のパーサーを作成する。
 * @returns 時刻パーサー
 */
const buildTimeStringParser = () => {
  const pattern = /^(?<hour>[0-2][0-9]):(?<minute>[0-5][0-9])$/; // 例: '00:00'

  const parser = (time: string): [number, number] | null => {
    const groups = time.match(pattern)?.groups;

    if (groups === undefined) return null;

    const hour = parseInt(groups.hour, 10);
    const minute = parseInt(groups.minute, 10);

    return [hour, minute];
  };

  return parser;
};


/**
 * 時刻の文字列から時・分を取得する。
 * @param time 時刻の文字列
 *             例: '12:34'
 * @returns [時, 分]
 *          失敗したときはnull
 */
const parseTimeString = buildTimeStringParser();


/**
 * グループ名変更の文字列のパーサーを作成する。
 * @returns グループ名変更パーサー
 */
const buildChangeGroupNameStringParser = () => {
  const pattern = /^(?<changer>.+)がグループ名を(?<newGroupName>.+)に変更しました。$/; // 例: '太郎がグループ名をABCに変更しました。'

  const parser = (str: string): { changer: string; newGroupName: string } | null => {
    const groups = str.match(pattern)?.groups;

    if (groups === undefined) return null;

    const { changer, newGroupName } = groups;

    return { changer, newGroupName };
  };

  return parser;
};


/**
 * グループ名変更の文字列から変更者・新しいグループ名を取得する。
 * @param str グループ名変更の文字列
 *            例: '太郎がグループ名をABCに変更しました。'
 * @returns [変更者, 新しいグループ名]
 *          失敗したときは null
 */
const parseChangeGroupNameString = buildChangeGroupNameStringParser();


export {
  parseTalkNameLine,
  parseExportDatetimeLine,
  parseDateString,
  parseTimeString,
  parseChangeGroupNameString,
};
