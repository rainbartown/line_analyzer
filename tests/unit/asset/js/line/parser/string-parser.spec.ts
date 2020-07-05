import * as sparser from '@/assets/js/line/parser/string-parser';


describe('parseTalkNameLine', () => {
  it('先頭行として有効な文字列ではトーク名', () => {
    const line = '[LINE] Group Aのトーク履歴';
    const talkName = 'Group A';

    expect(sparser.parseTalkNameLine(line)).toBe(talkName);
  });

  it('先頭行として無効な文字列では null', () => {
    const line = 'ABC';

    expect(sparser.parseTalkNameLine(line)).toBeNull();
  });
});


describe('parseExportDateTimeLine', () => {
  it('保存日時の行として有効な文字列では保存日時', () => {
    const line = '保存日時：2020/06/21 02:33';
    const datetime = new Date(2020, 5, 21, 2, 33);

    expect(sparser.parseExportDatetimeLine(line)).toStrictEqual(datetime);
  });

  it('保存日時の行として有効な文字列では null', () => {
    const line = 'LINE';

    expect(sparser.parseExportDatetimeLine(line)).toBeNull();
  });
});


describe('parseDateString', () => {
  it('日付として有効な文字列では [年, 月, 日]', () => {
    const date = '2019/01/02(水)';
    const year = 2019;
    const month = 0;
    const dayOfMonth = 2;

    expect(sparser.parseDateString(date)).toStrictEqual([year, month, dayOfMonth]);
  });

  it('日付として無効な文字列では null', () => {
    const date = '2019/01/02（水）'; // 括弧が全角
    expect(sparser.parseDateString(date)).toBeNull();
  });
});


describe('parseTimeString', () => {
  it('時刻として有効な文字列では [時, 分]', () => {
    const time = '12:34';
    const hour = 12;
    const minute = 34;

    expect(sparser.parseTimeString(time)).toStrictEqual([hour, minute]);
  });

  it('時刻として無効な文字列では null', () => {
    const time = '12-34';

    expect(sparser.parseTimeString(time)).toBeNull();
  });
});


describe('parseChangeGroupNameString', () => {
  it('グループ名変更として有効な文字列では { changer: 変更者, newGroupName: 新しいグループ名 }', () => {
    const str = '太郎がグループ名をABCに変更しました。';
    const changer = '太郎';
    const newGroupName = 'ABC';

    expect(sparser.parseChangeGroupNameString(str)).toStrictEqual({ changer, newGroupName });
  });

  it('グループ名変更として無効な文字列では null', () => {
    const str = '太郎がグループ名をABCに変更しました'; // 読点がない

    expect(sparser.parseChangeGroupNameString(str)).toBeNull();
  });
});
