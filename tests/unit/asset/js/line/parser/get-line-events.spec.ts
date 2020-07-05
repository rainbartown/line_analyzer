import getLineEvents from '@/assets/js/line/parser/get-line-events';
import * as sparser from '@/assets/js/line/parser/string-parser';
import { LineEvent } from '@/assets/js/line/line-event';
import { SpyInstance } from '../../../../types';


describe('getLineEvents', () => {
  let parseDateStringSpy: SpyInstance<typeof sparser.parseDateString>;
  let parseTimeStringSpy: SpyInstance<typeof sparser.parseTimeString>;
  let parseChangeGroupNameStringSpy: SpyInstance<typeof sparser.parseChangeGroupNameString>;

  beforeEach(() => {
    parseDateStringSpy = jest.spyOn(sparser, 'parseDateString');
    parseTimeStringSpy = jest.spyOn(sparser, 'parseTimeString');
    parseChangeGroupNameStringSpy = jest.spyOn(sparser, 'parseChangeGroupNameString');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('LINEイベントの配列を返す', () => {
    const lines = [
      '[LINE] Group Aのトーク履歴',
      '保存日時：2020/01/23 12:34',
      '',
      '2019/01/01(火)',
      '00:00\t太郎\tこんにちは',
      '00:00\t花子\tこんにちは',
      '12:01\tAlice\tHello',
      '14:02\tAliceがグループ名を新しいグループ名に変更しました。',
      '',
      '2020/03/06(金)',
      '02:02\t花子\t"複数行の\nメッセージ"',
      '04:34\t花子がグループ名をGroup Bに変更しました。',
      '20:49\tBobがグループ名をGroup Aに変更しました。',
      '22:20\tAlice\t"複数行の\nメッセージで\n""ダブルクオーテーション""\nが出現"',
      '22:21\tAlice\t"古いスタイルの改行と',
      '00:00\t時刻とタブ文字"',
      '23:59\t花子\tこんにちは',
      '',
    ];
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
        type: 'message/text',
        datetime: new Date(2019, 0, 1, 12, 1),
        sender: 'Alice',
      },
      {
        type: 'change_group_name',
        datetime: new Date(2019, 0, 1, 14, 2),
        changer: 'Alice',
        newGroupName: '新しいグループ名',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 6, 2, 2),
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
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 6, 22, 20),
        sender: 'Alice',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 6, 22, 21),
        sender: 'Alice',
      },
      {
        type: 'message/text',
        datetime: new Date(2020, 2, 6, 23, 59),
        sender: '花子',
      },
    ];

    parseDateStringSpy.mockImplementation((date: string): [number, number, number] | null => {
      switch (date) {
        case '2019/01/01(火)': return [2019, 0, 1];
        case '2020/03/06(金)': return [2020, 2, 6];
        default: return null;
      }
    });
    parseTimeStringSpy.mockImplementation((time: string): [number, number] | null => {
      switch (time) {
        case '00:00': return [0, 0];
        case '02:02': return [2, 2];
        case '04:34': return [4, 34];
        case '12:01': return [12, 1];
        case '14:02': return [14, 2];
        case '20:49': return [20, 49];
        case '22:20': return [22, 20];
        case '22:21': return [22, 21];
        case '23:59': return [23, 59];
        default: return null;
      }
    });
    parseChangeGroupNameStringSpy
      .mockImplementation((str: string): { changer: string; newGroupName: string } | null => {
        switch (str) {
          case 'Aliceがグループ名を新しいグループ名に変更しました。':
            return { changer: 'Alice', newGroupName: '新しいグループ名' };
          case '花子がグループ名をGroup Bに変更しました。':
            return { changer: '花子', newGroupName: 'Group B' };
          case 'Bobがグループ名をGroup Aに変更しました。':
            return { changer: 'Bob', newGroupName: 'Group A' };
          default: return null;
        }
      });

    expect(getLineEvents(lines)).toStrictEqual(lineEvents);
  });
});
