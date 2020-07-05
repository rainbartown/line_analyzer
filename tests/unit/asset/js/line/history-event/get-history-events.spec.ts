import getHistoryEvents from '@/assets/js/line/history-event/get-history-events';
import * as hevent from '@/assets/js/line/history-event/history-event';
import * as heutil from '@/assets/js/line/history-event/history-event-util';
import * as levent from '@/assets/js/line/line-event';
import * as leutil from '@/assets/js/line/line-event/line-event-util';
import { SpyInstance } from '../../../../types';


describe('getHistoryEvent', () => {
  let isLineChangeGroupNameEventSpy: SpyInstance<typeof leutil.isLineChangeGroupNameEvent>;
  let getLineFirstEventSpy: SpyInstance<typeof heutil.getLineFirstEvent>;
  let getLineLastEventSpy: SpyInstance<typeof heutil.getLineLastEvent>;

  beforeEach(() => {
    isLineChangeGroupNameEventSpy = jest.spyOn(leutil, 'isLineChangeGroupNameEvent');
    getLineFirstEventSpy = jest.spyOn(heutil, 'getLineFirstEvent');
    getLineLastEventSpy = jest.spyOn(heutil, 'getLineLastEvent');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('トークイベントの配列が空でないときは歴史イベント', () => {
    const lineEvents: Required<levent.LineEvent>[] = [
      {
        type: 'message/text',
        datetime: new Date(2020, 1, 1, 0, 0),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 1, 1, 0, 0),
        sender: '花子',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 1, 2, 0, 0),
        changer: '花子',
        newGroupName: 'Group A',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 1, 2, 3, 4),
        sender: '太郎',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 1, 3, 5, 0),
        changer: '太郎',
        newGroupName: 'Group B',
      },
    ];
    const firstEvent: hevent.LineFirstEvent = {
      type: 'first_event',
      datetime: new Date(2020, 1, 1, 0, 0),
    };
    const lastEvent: hevent.LineLastEvent = {
      type: 'last_event',
      datetime: new Date(2020, 1, 3, 5, 0),
    };
    const historyEvents: hevent.HistoryEvent[] = [
      firstEvent,
      {
        type: 'change_group_name',
        datetime: new Date(2020, 1, 2, 0, 0),
        changer: '花子',
        newGroupName: 'Group A',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 1, 3, 5, 0),
        changer: '太郎',
        newGroupName: 'Group B',
      },
      lastEvent,
    ];

    isLineChangeGroupNameEventSpy
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    getLineFirstEventSpy.mockReturnValue(firstEvent);
    getLineLastEventSpy.mockReturnValue(lastEvent);

    expect(getHistoryEvents(lineEvents)).toStrictEqual(historyEvents);
    expect(isLineChangeGroupNameEventSpy).toHaveBeenCalledTimes(lineEvents.length);
  });

  it('トークイベントの配列が空のときは空の歴史イベント', () => {
    getLineFirstEventSpy.mockReturnValue(null);
    getLineLastEventSpy.mockReturnValue(null);

    expect(getHistoryEvents([])).toStrictEqual([]);
    expect(isLineChangeGroupNameEventSpy).toHaveBeenCalledTimes(0);
  });
});
