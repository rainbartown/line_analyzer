import * as levent from '@/assets/js/line/line-event';
import * as leutil from '@/assets/js/line/line-event/line-event-util';
import { LineState } from '@/store/line/state';
import getters from '@/store/line/getters';
import { SpyInstance } from '../../types';


// トーク履歴ファイルを読み込む前のVuexステートを作成
const getInitialState = (): LineState => ({
  talkName: '',
  members: new Set(),
  lineEvents: [],
  exportDatetime: null,
});

const talkName = '〇〇';
const members = new Set(['太郎', '花子', 'Alice']);
const lineEvents: levent.LineEvent[] = [
  {
    type: 'message/text',
    datetime: new Date(2019, 11, 1, 0, 2),
    sender: '太郎',
  },
  {
    type: 'change_group_name',
    datetime: new Date(2019, 11, 2, 1, 0),
    changer: '花子',
    newGroupName: 'Group A',
  },
  {
    type: 'message/text',
    datetime: new Date(2020, 2, 20, 17, 15),
    sender: 'Alice',
  },
  {
    type: 'message/text',
    datetime: new Date(2019, 2, 20, 18, 0),
    sender: '太郎',
  },
  {
    type: 'change_group_name',
    datetime: new Date(2019, 5, 12, 2, 29),
    changer: '太郎',
    newGroupName: 'Group B',
  },
];
const exportDatetime = new Date(2020, 5, 21, 12, 34);

// トーク履歴ファイルを読み込んだ後のVuexステートを作成
const getFilledState = (): LineState => ({
  talkName, members, lineEvents, exportDatetime,
});


// TypeScriptでは getters.func(state) でエラーになるため、ヘルパーを利用する。
const testGetter = (_getters: any, type: string, state: LineState, expected: any) => {
  const getter = _getters[type];
  expect(getter(state)).toStrictEqual(expected);
};


describe('talkName', () => {
  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'talkName', state, '');
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();

    testGetter(getters, 'talkName', state, talkName);
  });
});


describe('members', () => {
  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'members', state, new Set());
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();

    testGetter(getters, 'members', state, members);
  });
});


describe('lineEvents', () => {
  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'lineEvents', state, []);
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();

    testGetter(getters, 'lineEvents', state, lineEvents);
  });
});


describe('lineMessageEvents', () => {
  let isLineMessageEventSpy: SpyInstance<typeof leutil.isLineMessageEvent>;

  beforeEach(() => {
    isLineMessageEventSpy = jest.spyOn(leutil, 'isLineMessageEvent');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'lineMessageEvents', state, []);
    expect(isLineMessageEventSpy).not.toHaveBeenCalled();
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();
    const lineMessageEvents: levent.LineMessageEvent[] = [
      {
        type: 'message/text',
        datetime: new Date(2019, 11, 1, 0, 2),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 20, 17, 15),
        sender: 'Alice',
      },
      {
        type: 'message/text',
        datetime: new Date(2019, 2, 20, 18, 0),
        sender: '太郎',
      },
    ];

    isLineMessageEventSpy
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    testGetter(getters, 'lineMessageEvents', state, lineMessageEvents);
    expect(isLineMessageEventSpy).toHaveBeenCalledTimes(state.lineEvents.length);
  });
});


describe('lineTextMessageEvents', () => {
  let isLineTextMessageEventSpy: SpyInstance<typeof leutil.isLineTextMessageEvent>;

  beforeEach(() => {
    isLineTextMessageEventSpy = jest.spyOn(leutil, 'isLineTextMessageEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'lineMessageEvents', state, []);
    expect(isLineTextMessageEventSpy).not.toHaveBeenCalled();
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();
    const lineTextMessageEvents: levent.LineTextMessageEvent[] = [
      {
        type: 'message/text',
        datetime: new Date(2019, 11, 1, 0, 2),
        sender: '太郎',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 20, 17, 15),
        sender: 'Alice',
      },
      {
        type: 'message/text',
        datetime: new Date(2019, 2, 20, 18, 0),
        sender: '太郎',
      },
    ];

    isLineTextMessageEventSpy
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    testGetter(getters, 'lineTextMessageEvents', state, lineTextMessageEvents);
    expect(isLineTextMessageEventSpy).toHaveBeenCalledTimes(state.lineEvents.length);
  });
});


describe('lineChangeTalkNameEvents', () => {
  let isLineChangeGroupNameEventSpy: SpyInstance<typeof leutil.isLineChangeGroupNameEvent>;

  beforeEach(() => {
    isLineChangeGroupNameEventSpy = jest.spyOn(leutil, 'isLineChangeGroupNameEvent');
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'lineChangeTalkNameEvents', state, []);
    expect(isLineChangeGroupNameEventSpy).not.toHaveBeenCalled();
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();
    const lineChangeTalkNameEvents: levent.LineChangeGroupNameEvent[] = [
      {
        type: 'change_group_name',
        datetime: new Date(2019, 11, 2, 1, 0),
        changer: '花子',
        newGroupName: 'Group A',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2019, 5, 12, 2, 29),
        changer: '太郎',
        newGroupName: 'Group B',
      },
    ];

    isLineChangeGroupNameEventSpy
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    testGetter(getters, 'lineChangeTalkNameEvents', state, lineChangeTalkNameEvents);
    expect(isLineChangeGroupNameEventSpy).toHaveBeenCalledTimes(state.lineEvents.length);
  });
});


describe('exportDatetime', () => {
  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'exportDatetime', state, null);
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();

    testGetter(getters, 'exportDatetime', state, exportDatetime);
  });
});


describe('hasData', () => {
  it('トーク履歴ファイルを読み込む前', () => {
    const state = getInitialState();

    testGetter(getters, 'hasData', state, false);
  });

  it('トーク履歴ファイルを読み込んだ後', () => {
    const state = getFilledState();

    testGetter(getters, 'hasData', state, true);
  });
});
