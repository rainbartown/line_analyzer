import { LineState } from '@/store/line/state';
import mutations from '@/store/line/mutations';


// トーク履歴ファイルを読み込む前のVuexステートを作成
const getInitialState = (): LineState => ({
  talkName: '',
  members: new Set(),
  lineEvents: [],
  exportDatetime: null,
});


describe('setTalkName', () => {
  const { setTalkName } = mutations;

  it('トーク名を登録', () => {
    const state = getInitialState();
    const talkName: LineState['talkName'] = 'ABC';

    setTalkName(state, talkName);

    expect(state.talkName).toBe(talkName);
  });
});


describe('setMembers', () => {
  const { setMembers } = mutations;

  it('メンバーの集合を登録', () => {
    const state = getInitialState();
    const members: LineState['members'] = new Set(['太郎', '花子']);

    setMembers(state, members);

    expect(state.members).toStrictEqual(members);
  });
});


describe('setLineEvents', () => {
  const { setLineEvents } = mutations;

  it('LINEトークイベントの配列を登録', () => {
    const state = getInitialState();
    const lineEvents: LineState['lineEvents'] = [
      {
        type: 'message/text',
        datetime: new Date(2019, 0, 1, 0, 0),
        sender: '太郎',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2020, 2, 6, 12, 34),
        changer: '花子',
        newGroupName: 'ABC',
      },
    ];

    setLineEvents(state, lineEvents);

    expect(state.lineEvents).toStrictEqual(lineEvents);
  });
});


describe('setExportDate', () => {
  const { setExportDatetime } = mutations;

  it('トーク履歴の保存日時を登録', () => {
    const state = getInitialState();
    const exportDatetime = new Date(2020, 5, 21, 12, 34);

    setExportDatetime(state, exportDatetime);

    expect(state.exportDatetime).toStrictEqual(exportDatetime);
  });
});
