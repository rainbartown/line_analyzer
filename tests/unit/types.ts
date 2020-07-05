/**
 * ユニットテスト用の型を定義
 */


// アロー関数の引数の型
// 例:
// const func = (num: number, str: string): boolean => { ... };
// ArgsType<typeof func> は [number, string]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgsType<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A : never;


// JestのSpyInstanceの型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpyInstance<M extends (...args: any[]) => any> = jest.SpyInstance<ReturnType<M>, ArgsType<M>>;


export {
  ArgsType,
  SpyInstance,
};
