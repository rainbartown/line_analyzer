/**
 * LINEトークのイベントに関する簡単なユーティリティ
 */


import * as levent from './line-event';


/**
 * LINEトークのイベントがメッセージであるか。
 * @param event LINEトークのイベント
 * @returns メッセージであるか
 */
const isLineMessageEvent = (event: levent.LineEvent): event is levent.LineMessageEvent => (
  event.type.startsWith('message/'));


/**
 * LINEトークのイベントがテキストメッセージであるか。
 * @param event LINEトークのイベント
 * @returns テキストメッセージであるか
 */
const isLineTextMessageEvent = (event: levent.LineEvent): event is levent.LineTextMessageEvent => (
  event.type === 'message/text');


/**
 * LINEトークのイベントがグループ名の変更であるか。
 * @param event LINEトークのイベント
 * @returns グループ名の変更であるか
 */
const isLineChangeGroupNameEvent = (event: levent.LineEvent):
  event is levent.LineChangeGroupNameEvent => (
  event.type === 'change_group_name');


export {
  isLineMessageEvent,
  isLineTextMessageEvent,
  isLineChangeGroupNameEvent,
};
