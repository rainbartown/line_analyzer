import store from '@/store';
import * as guards from '@/router/guards';


jest.mock('@/store');


describe('jumpToRootIfNoData', () => {
  const jumpToRootIfNoData = guards.jumpToRootIfNoData as any;

  it('ターゲットがルートのときはそのまま遷移', () => {
    (store.getters as any) = { 'line/hasData': true };
    const to = { path: '/' };
    const from = {};
    const next = jest.fn();

    jumpToRootIfNoData(to, from, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });

  it('トーク履歴ファイルを読み込む前はルートに遷移', () => {
    (store.getters as any) = { 'line/hasData': false };
    const to = { path: '/history' };
    const from = {};
    const next = jest.fn();

    jumpToRootIfNoData(to, from, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith('/');
  });

  it('トーク履歴ファイルを読み込んだ後はターゲットへ遷移', () => {
    (store.getters as any) = { 'line/hasData': true };
    const to = { path: '/history' };
    const from = {};
    const next = jest.fn();

    jumpToRootIfNoData(to, from, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
