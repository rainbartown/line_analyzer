import { Message, HistoryEvent } from '@/assets/js/data';


/**
 * トークファイルを読み、中身のテキストを返す関数
 * @param file トークファイル
 * @returns トークファイルの中身
 */
const readFile = (file: File): Promise<string> => (
  new Promise<string>((resolve, reject) => {
    // ファイルが選択されていなければエラー
    if (file === undefined) reject(new Error('ファイルが選択されていません'));
    // ファイル形式がテキストでなければエラー
    if (file.type !== 'text/plain') reject(new Error('ファイル形式が間違っています'));

    const reader = new FileReader();
    reader.onload = () => {
      const { result } = reader;
      if (typeof result === 'string') resolve(result);
      reject(new Error('ファイル読み込み中にエラーが発生しました'));
    };
    reader.onerror = () => reject(new Error('ファイル読み込み中にエラーが発生しました'));
    reader.readAsText(file);
  })
);


/**
 * トークグループの情報を表すインタフェース
 */
interface TalkInfo {
  talkName: string;
  history: HistoryEvent[];
  messages: Message[];
  speakersData: {[name: string]: {name: string}};
}


/* eslint-disable max-len */
/**
 *  トークファイルの中身を読み込んで、トークグループの情報を返す関数
 * @param {string} text トークファイルの中身
 * @returns トークグループの情報
 */
/* eslint-enable max-len */
const loadFile = async (text: string): Promise<TalkInfo> => {
  const lines = text.split('\n');
  const history: HistoryEvent[] = [];
  const messages: Message[] = [];
  const speakersData: {[name: string]: {name: string}} = {};

  // トークルーム名
  const talkNamePattern = /^\[LINE\] (.*)のトーク履歴/; // 1行目のトーク名 "[LINE] 〇〇のトーク履歴"
  const talkNameMatch = lines[0].match(talkNamePattern); // "[LINE] 〇〇のトーク履歴"
  if (talkNameMatch === null) throw new Error('トーク履歴ファイルが選択されていません');
  const talkName = talkNameMatch[1];

  // メッセージ
  const datePattern = /^20[0-9][0-9]\/[0-1][0-9]\/[0-3][0-9]\(.\)/; // 日付 "2019/01/01(火)"
  const timePattern = /^[0-2][0-9]:[0-5][0-9]$/; // 時刻 "00:00"
  const changeTalkNamePattern = /^(.*)がグループ名を(.*)に変更しました。/; // グループ名の変更
  let year: number;
  let month: number;
  let dayOfMonth: number;
  lines.forEach((line) => {
    const col = line.split('\t');
    switch (col.length) {
      case 1: // 日付 "2019/01/01(火)"
        if (col[0].match(datePattern)) { // 日付 "2019/01/01(火)"
          [year, month, dayOfMonth] = col[0].slice(0, 10).split('/').map((el) => parseInt(el, 10));
        }
        break;
      case 2: // グループイベント
        if (col[0].match(timePattern)) { // 時刻 "00:00"
          const [hour, minute] = col[0].split(':').map((el) => parseInt(el, 10));
          const match = col[1].match(changeTalkNamePattern);
          if (match) { // グループ名の変更
            const [, actor, newTalkName] = match;
            history.push({
              type: 'CHANGE_TALK_NAME',
              datetime: new Date(year, month - 1, dayOfMonth, hour, minute, 30, 0),
              actor,
              newTalkName,
            });
          }
        }
        break;
      case 3: // 発言 "00:00\t太郎\tこんにちは"
        if (col[0].match(timePattern)) { // 時刻 "00:00"
          const [hour, minute] = col[0].split(':').map((el) => parseInt(el, 10));
          const speaker = col[1]; // eslint-disable-line prefer-destructuring
          messages.push({
            speaker,
            datetime: new Date(year, month - 1, dayOfMonth, hour, minute, 30, 0),
          });
          if (!speakersData[speaker]) speakersData[speaker] = { name: speaker };
        }
        break;
      default:
      //
    }
  });

  // 履歴の始まりと終わりをヒストリーに追加
  if (messages.length > 0) {
    // 履歴の始まり
    history.unshift({
      type: 'START_TALK',
      datetime: messages[0].datetime,
    });
    // 履歴の終わり
    history.push({
      type: 'END_TALK',
      datetime: messages[messages.length - 1].datetime,
    });
  }

  return {
    talkName,
    history,
    messages,
    speakersData,
  };
};


export { readFile, loadFile };
