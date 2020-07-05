import * as levent from '@/assets/js/line/line-event/line-event';
import * as leutil from '@/assets/js/line/line-event/line-event-util';


describe('isLineMessageEvent', () => {
  it('LineTextMessageEvent では true', () => {
    const event: levent.LineTextMessageEvent = {
      type: 'message/text',
      datetime: new Date(2020, 1, 1, 0, 0),
      sender: '太郎',
    };

    expect(leutil.isLineMessageEvent(event)).toBe(true);
  });

  it('LineChangeGroupNameEvent では false', () => {
    const event: levent.LineChangeGroupNameEvent = {
      type: 'change_group_name',
      datetime: new Date(2020, 1, 1, 0, 0),
      changer: '太郎',
      newGroupName: '新しいグループ名',
    };

    expect(leutil.isLineMessageEvent(event)).toBe(false);
  });
});


describe('isLineTextMessageEvent', () => {
  it('LineTextMessageEvent では true', () => {
    const event: levent.LineTextMessageEvent = {
      type: 'message/text',
      datetime: new Date(2020, 1, 1, 0, 0),
      sender: '太郎',
    };

    expect(leutil.isLineTextMessageEvent(event)).toBe(true);
  });

  it('LineChangeGroupNameEvent では false', () => {
    const event: levent.LineChangeGroupNameEvent = {
      type: 'change_group_name',
      datetime: new Date(2020, 1, 1, 0, 0),
      changer: '太郎',
      newGroupName: '新しいグループ名',
    };

    expect(leutil.isLineTextMessageEvent(event)).toBe(false);
  });
});


describe('isLineChangeGroupNameEvent', () => {
  it('LineChangeGroupNameEvent では true', () => {
    const event: levent.LineChangeGroupNameEvent = {
      type: 'change_group_name',
      datetime: new Date(2020, 1, 1, 0, 0),
      changer: '太郎',
      newGroupName: '新しいグループ名',
    };

    expect(leutil.isLineChangeGroupNameEvent(event)).toBe(true);
  });

  it('LineTextMessageEvent では false', () => {
    const event: levent.LineTextMessageEvent = {
      type: 'message/text',
      datetime: new Date(2020, 1, 1, 0, 0),
      sender: '太郎',
    };

    expect(leutil.isLineChangeGroupNameEvent(event)).toBe(false);
  });
});
