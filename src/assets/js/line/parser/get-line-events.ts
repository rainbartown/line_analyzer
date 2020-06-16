import * as levent from '@/assets/js/line/line-event';
import * as sparser from './string-parser';


/**
 * トーク履歴ファイルの各行からイベントを取得する。
 * @param lines トーク履歴ファイルの行の配列
 * @returns LINEイベントの配列
 */
const getLineEvents = (lines: string[]): levent.LineEvent[] => {
  const lineEvents: levent.LineEvent[] = [];
  let year: number;
  let month: number; // 0-11
  let dayOfMonth: number;

  lines.forEach((line) => {
    // 空行
    if (line.length === 0) return;

    // 解析の高速化のためにタブ文字で分割する。
    // イベントタイプの絞り込みと正規表現の適用範囲の限定ができる。
    const separate = line.split('\t');

    if (separate.length === 1) {
      // 日付
      // 例: '2019/01/01(火)'
      const date = sparser.parseDateString(line);
      if (date !== null) {
        [year, month, dayOfMonth] = date;
        return;
      }
    }

    const time = sparser.parseTimeString(separate[0]);
    if (time === null) return;
    const [hour, minute] = time;
    const datetime = new Date(year, month, dayOfMonth, hour, minute);

    if (separate.length === 2) {
      // グループ名変更
      const changeGroupNameData = sparser.parseChangeGroupNameString(separate[1]);
      if (changeGroupNameData !== null) {
        const changeGroupName: levent.LineChangeGroupNameEvent = {
          type: 'change_group_name',
          datetime,
          ...changeGroupNameData,
        };
        lineEvents.push(changeGroupName);
        return;
      }
      return;
    }

    // テキストメッセージ
    // 例: '00:00\t太郎\tメッセージ'
    const textMessage: levent.LineTextMessageEvent = {
      type: 'message/text',
      datetime,
      sender: separate[1],
    };
    lineEvents.push(textMessage);
  });

  return lineEvents;
};


export default getLineEvents;
