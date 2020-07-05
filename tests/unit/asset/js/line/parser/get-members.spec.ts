import getMembers from '@/assets/js/line/parser/get-members';
import { LineEvent } from '@/assets/js/line/line-event';
import * as leutil from '@/assets/js/line/line-event/line-event-util';
import { SpyInstance } from '../../../../types';


describe('getMembers', () => {
  let isLineTextMessageEventSpy: SpyInstance<typeof leutil.isLineTextMessageEvent>;
  let isLineChangeGroupNameEventSpy: SpyInstance<typeof leutil.isLineChangeGroupNameEvent>;

  beforeEach(() => {
    isLineTextMessageEventSpy = jest.spyOn(leutil, 'isLineTextMessageEvent');
    isLineChangeGroupNameEventSpy = jest.spyOn(leutil, 'isLineChangeGroupNameEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('参加メンバーのセットを返す', () => {
    const lineEvents: LineEvent[] = [
      {
        type: 'message/text',
        datetime: new Date(2019, 0, 1, 0, 0),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2019, 0, 1, 0, 0),
        sender: '花子',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 2, 6, 4, 34),
        changer: '花子',
        newGroupName: 'Group B',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 2, 6, 20, 49),
        changer: 'Bob',
        newGroupName: 'Group A',
      },
    ];
    const members = new Set(['太郎', '花子', 'Bob']);

    isLineTextMessageEventSpy
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    isLineChangeGroupNameEventSpy.mockReturnValue(true);

    expect(getMembers(lineEvents)).toStrictEqual(members);
  });
});
