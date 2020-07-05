import * as getLineEvents from '@/assets/js/line/parser/get-line-events';
import * as getMembers from '@/assets/js/line/parser/get-members';
import parseTalkFile from '@/assets/js/line/parser/parse-talk-file';
import * as sparser from '@/assets/js/line/parser/string-parser';
import * as levent from '@/assets/js/line/line-event';
import { SpyInstance } from '../../../../types';


describe('parseTalkFile', () => {
  let getLineEventsSpy: SpyInstance<typeof getLineEvents.default>;
  let getMembersSpy: SpyInstance<typeof getMembers.default>;
  let parseTalkNameLineSpy: SpyInstance<typeof sparser.parseTalkNameLine>;
  let parseExportDatetimeLineSpy: SpyInstance<typeof sparser.parseExportDatetimeLine>;

  beforeEach(() => {
    getLineEventsSpy = jest.spyOn(getLineEvents, 'default');
    getMembersSpy = jest.spyOn(getMembers, 'default');
    parseTalkNameLineSpy = jest.spyOn(sparser, 'parseTalkNameLine');
    parseExportDatetimeLineSpy = jest.spyOn(sparser, 'parseExportDatetimeLine');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('トーク名, 参加メンバーの集合, LINEイベントの配列、トーク履歴の保存日時を返す', () => {
    const lines = [
      '[LINE] Group Aのトーク履歴',
      '保存日時：2020/01/23 12:34',
      '',
      '2019/01/01(火)',
      '00:00\t太郎\tこんにちは',
      '00:00\t花子\tこんにちは',
      '',
      '2020/03/06(金)',
      '04:34\t花子がグループ名をGroup Bに変更しました。',
      '20:49\tBobがグループ名をGroup Aに変更しました。',
      '',
    ];
    const text = lines.join('\r\n');
    const talkName = 'Group A';
    const members = new Set(['太郎', '花子', 'Bob']);
    const lineEvents: levent.LineEvent[] = [
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
    const exportDatetime = new Date(2020, 5, 21, 12, 34);

    getLineEventsSpy.mockReturnValue(lineEvents);
    getMembersSpy.mockReturnValue(members);
    parseTalkNameLineSpy.mockReturnValue(talkName);
    parseExportDatetimeLineSpy.mockReturnValue(exportDatetime);

    expect(parseTalkFile(text)).toStrictEqual({
      talkName, members, lineEvents, exportDatetime,
    });
  });

  it('トーク名を解析できないときはエラー', () => {
    const errorMessage = 'グループ名の解析に失敗しました';

    parseTalkNameLineSpy.mockReturnValue(null);
    parseExportDatetimeLineSpy.mockReturnValue(new Date(2020, 0, 1, 0, 0));

    expect(() => parseTalkFile('')).toThrow(errorMessage);
    expect(parseTalkNameLineSpy).toReturnWith(null);
    expect(parseExportDatetimeLineSpy).not.toHaveBeenCalled();
  });

  it('保存日時を解析できないときはエラー', () => {
    const errorMessage = '保存日時の解析に失敗しました';

    parseTalkNameLineSpy.mockReturnValue('');
    parseExportDatetimeLineSpy.mockReturnValue(null);

    expect(() => parseTalkFile('')).toThrow(errorMessage);
    expect(parseTalkNameLineSpy).not.toReturnWith(null);
    expect(parseExportDatetimeLineSpy).toReturnWith(null);
  });
});
