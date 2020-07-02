/**
 * ファイルに関するモジュール
 */


/**
 * テキストファイルを読み、中身のテキストを返す関数
 * @param file テキストファイル
 * @returns 中身のテキスト
 */
const readTextFile = (file: File): Promise<string> => (
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const { result } = reader;
      if (typeof result === 'string') resolve(result);
      reject(new Error('ファイル読み込みでエラーが発生しました'));
    });

    reader.addEventListener('error', () => {
      reject(new Error('ファイル読み込みでエラーが発生しました'));
    });

    reader.readAsText(file);
  })
);


export {
  readTextFile,
};
