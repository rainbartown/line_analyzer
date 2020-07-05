import * as hevent from '@/assets/js/line/history-event/history-event';
import * as heutil from '@/assets/js/line/history-event/history-event-util';
import * as levent from '@/assets/js/line/line-event';


describe('isLineFirstEvent', () => {
  it('LineFirstEvent では true', () => {
    const event: hevent.LineFirstEvent = {
      type: 'first_event',
      datetime: new Date(2020, 0, 1, 0, 0),
    };

    expect(heutil.isLineFirstEvent(event)).toStrictEqual(true);
  });

  it('LineLastEvent では false', () => {
    const event: hevent.LineLastEvent = {
      type: 'last_event',
      datetime: new Date(2020, 0, 1, 0, 0),
    };

    expect(heutil.isLineFirstEvent(event)).toStrictEqual(false);
  });
});


describe('isLineLastEvent', () => {
  it('LineLastEvent では true', () => {
    const event: hevent.LineLastEvent = {
      type: 'last_event',
      datetime: new Date(2020, 0, 1, 0, 0),
    };

    expect(heutil.isLineLastEvent(event)).toStrictEqual(true);
  });

  it('LineFirstEvent では false', () => {
    const event: hevent.LineFirstEvent = {
      type: 'first_event',
      datetime: new Date(2020, 0, 1, 0, 0),
    };

    expect(heutil.isLineLastEvent(event)).toStrictEqual(false);
  });
});


describe('getLineFirstEvent', () => {
  it('トークイベントの配列が空でないときは最初のイベント', () => {
    const lineEvents: Required<levent.LineEvent>[] = [
      {
        type: 'message/text',
        datetime: new Date(2020, 0, 1, 0, 0),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 1, 1, 0, 0),
        sender: '花子',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 2, 4, 0, 0),
        changer: '花子',
        newGroupName: 'Group A',
      },
    ];
    const firstEvent: hevent.LineFirstEvent = {
      type: 'first_event',
      datetime: new Date(2020, 0, 1, 0, 0),
    };

    expect(heutil.getLineFirstEvent(lineEvents)).toStrictEqual(firstEvent);
  });

  it('・トークイベントの配列が空のときは null', () => {
    expect(heutil.getLineFirstEvent([])).toBeNull();
  });
});


describe('getLineLastEvent', () => {
  it('トークイベントの配列が空でないときは最後のイベント', () => {
    const lineEvents: Required<levent.LineEvent>[] = [
      {
        type: 'message/text',
        datetime: new Date(2020, 0, 1, 0, 0),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 1, 1, 0, 0),
        sender: '花子',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 2, 4, 0, 0),
        changer: '花子',
        newGroupName: 'Group A',
      },
    ];
    const lastEvent: hevent.LineLastEvent = {
      type: 'last_event',
      datetime: new Date(2020, 2, 4, 0, 0),
    };

    expect(heutil.getLineLastEvent(lineEvents)).toStrictEqual(lastEvent);
  });


  it('トークイベントの配列が空のときは null', () => {
    expect(heutil.getLineLastEvent([])).toBeNull();
  });
});
