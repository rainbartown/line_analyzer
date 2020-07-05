import parseTalkFile, * as parser from '@/assets/js/line/parser/parse-talk-file';
import * as commonFile from '@/assets/js/common/file';
import { LineEvent } from '@/assets/js/line/line-event';
import actions from '@/store/line/actions';
import { SpyInstance } from '../../types';


describe('loadTalkFile', () => {
  // TypeScript ではエラーが起こるため型を変換
  const { loadTalkFile: _loadTalkFile } = actions;
  const loadTalkFile = _loadTalkFile as ({ commit }: any, file: File) => Promise<void>;

  let readTextFileSpy: SpyInstance<typeof commonFile.readTextFile>;
  let parseTalkFileSpy: SpyInstance<typeof parser.default>;
  let consoleErrorSpy: SpyInstance<typeof console.error>;
  let alertSpy: SpyInstance<typeof alert>;

  beforeEach(() => {
    readTextFileSpy = jest.spyOn(commonFile, 'readTextFile');
    parseTalkFileSpy = jest.spyOn(parser, 'default');
    consoleErrorSpy = jest.spyOn(console, 'error');
    alertSpy = jest.spyOn(window, 'alert');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('トークファイルを読み込み、解析結果をVuexストアに登録する', async () => {
    const talkName = '〇〇';
    const members = new Set(['Alice']);
    const lineEvents: LineEvent[] = [
      { type: 'message/text', datetime: new Date(2020, 5, 20, 17, 15), sender: 'Alice' },
    ];
    const exportDatetime = new Date(2020, 5, 21, 12, 34);
    const parserReturn: ReturnType<typeof parseTalkFile> = { // parseTalkFile のモックの返り値
      talkName,
      members,
      lineEvents,
      exportDatetime,
    };
    const file = new File(['トークファイルの中身'], 'dummy.txt', { type: 'text/plain' });

    readTextFileSpy.mockResolvedValue('');
    parseTalkFileSpy.mockReturnValue(parserReturn);
    const commitMock = jest.fn();

    await loadTalkFile({ commit: commitMock }, file);

    expect(commitMock).toHaveBeenCalledTimes(4);
    expect(commitMock).toHaveBeenCalledWith('setTalkName', talkName);
    expect(commitMock).toHaveBeenCalledWith('setMembers', members);
    expect(commitMock).toHaveBeenCalledWith('setLineEvents', lineEvents);
    expect(commitMock).toHaveBeenCalledWith('setExportDatetime', exportDatetime);
  });

  it('テキストファイルでなければエラー', async () => {
    const file = new File([], 'dummy.png', { type: 'image/png' });
    const error = new Error('LINEのトーク履歴ファイルを選択してください');

    readTextFileSpy.mockResolvedValue('');
    parseTalkFileSpy.mockReturnValue({
      talkName: '',
      members: new Set(),
      lineEvents: [],
      exportDatetime: new Date(2020, 0, 1, 0, 0),
    } as ReturnType<typeof parseTalkFile>);
    consoleErrorSpy.mockImplementation();
    alertSpy.mockImplementation();
    const commitMock = jest.fn();

    await loadTalkFile({ commit: commitMock }, file);

    expect(readTextFileSpy).not.toHaveBeenCalled();
    expect(parseTalkFileSpy).not.toHaveBeenCalled();
    expect(commitMock).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(error.message);
  });
});
