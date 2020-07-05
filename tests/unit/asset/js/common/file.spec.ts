import { readTextFile } from '@/assets/js/common/file';
import { SpyInstance } from '../../../types';


describe('readTextFile', () => {
  let readAsTextSpy: SpyInstance<typeof FileReader.prototype.readAsText>;

  beforeEach(() => {
    readAsTextSpy = jest.spyOn(FileReader.prototype, 'readAsText');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('テキストファイルでは中身の文字列を返す', async () => {
    const file = new File(['テキストファイルの中身'], 'dummy.txt', { type: 'text/plain' });

    await expect(readTextFile(file)).resolves.toBe('テキストファイルの中身');
  });

  it('FileReaderでエラーが起きたときはreadTextFileもエラーを投げる', async () => {
    const file = new File(['テキストファイルの中身'], 'dummy.txt', { type: 'text/plain' });
    const errorMessage = 'ファイル読み込みでエラーが発生しました';

    // eslint-disable-next-line func-names
    readAsTextSpy.mockImplementation(function (this: FileReader) {
      this.dispatchEvent(new Event('error'));
    });

    await expect(readTextFile(file)).rejects.toThrow(errorMessage);
  });
});
