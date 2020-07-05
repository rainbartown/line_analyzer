/**
 * LINEトークのイベントのインタフェース
 */


/**
 * LINEトークのイベント
 */
type LineEvent = LineMessageEvent | LineChangeGroupNameEvent;


/**
 * LINEトークのイベントに必要なインタフェース
 */
interface LineEventBase {
  readonly type: string; // イベントのタイプ
  readonly datetime: Date; // イベントの日時
}


/**
 * LINEトークのメッセージイベント
 */
type LineMessageEvent = LineTextMessageEvent;


/**
 * LINEトークのメッセージイベントに必要なインタフェース
 */
interface LineMessageEventBase extends LineEventBase {
  readonly sender: string; // 送信者
}


/**
 * テキストメッセージ
 */
interface LineTextMessageEvent extends LineMessageEventBase {
  readonly type: 'message/text';
}


/**
 * グループ名の変更
 */
interface LineChangeGroupNameEvent extends LineEventBase {
  readonly type: 'change_group_name';
  readonly changer: string; // 変更者
  readonly newGroupName: string; // 新しいグループ名
}


export {
  LineEvent,
  LineEventBase,
  LineMessageEvent,
  LineMessageEventBase,
  LineTextMessageEvent,
  LineChangeGroupNameEvent,
};
