import * as levent from '@/assets/js/line/line-event';


/**
 * LINEイベントの配列からトークの参加メンバーを取得する。
 * @param events LINEイベントの配列
 * @returns 参加メンバーの集合
 */
const getMembers = (events: levent.LineEvent[]): Set<string> => {
  const members: Set<string> = new Set();

  events.forEach((event) => {
    if (levent.isLineTextMessageEvent(event)) {
      members.add(event.sender);
    } else if (levent.isLineChangeGroupNameEvent(event)) {
      members.add(event.changer);
    }
  });

  return members;
};


export default getMembers;
