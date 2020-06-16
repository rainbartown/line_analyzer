/**
 * トーク履歴ファイルのテキストを解析する。
 */


import * as levent from '@/assets/js/line/line-event';
import getLineEvents from './get-line-events';
import getMembers from './get-members';
import * as sparser from './string-parser';


/**
 * トーク履歴ファイルのテキストを解析する。
 * @param text トーク履歴ファイルのテキスト
 * @returns トーク名, 参加メンバーの集合, LINEイベントの配列
 */
const parseTalkFile = (text: string): {
  readonly talkName: string;
  readonly members: Set<string>;
  readonly lineEvents: levent.LineEvent[];
  readonly exportDatetime: Date;
} => {
  // トーク履歴ファイルの改行文字は '\r\n'
  // 2020年06月の最新版LINEでは複数行メッセージ中の改行文字は送信時に '\n' に変換される。
  // 以前のバージョンによっては、複数行メッセージ中の改行文字に '\n' と '\r\n' が混在している。
  // 複数行メッセージ中の改行文字はメッセージの送信時に決定し、トーク履歴送信時に決定するものではない。
  const lines = text.split('\r\n');

  const talkName = sparser.parseTalkNameLine(lines[0]);
  if (talkName === null) throw new Error('グループ名の解析に失敗しました');
  const exportDatetime = sparser.parseExportDatetimeLine(lines[1]);
  if (exportDatetime === null) throw new Error('保存日時の解析に失敗しました');

  const lineEvents = getLineEvents(lines);
  const members = getMembers(lineEvents);

  return {
    talkName, exportDatetime, members, lineEvents,
  };
};


export default parseTalkFile;

export {
  getLineEvents,
  getMembers,
};
