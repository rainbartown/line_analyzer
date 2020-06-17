/**
 * ナビゲーションガードを定義
 */


import { NavigationGuard } from 'vue-router';
import store from '@/store';


/**
 * トーク履歴ファイルを読み込む前は '/' へジャンプさせる。
 * ページの再読み込みやパスの手打ちで遷移することを防ぐ。
 * ファイル読み込み後のパスの打ち間違いは防げない。
 */
const jumpToRootIfNoData: NavigationGuard<Vue> = (to, from, next) => {
  if (to.path === '/' || store.getters['line/hasData']) {
    next();
  } else {
    next('/');
  }
};


export {
  jumpToRootIfNoData, // eslint-disable-line import/prefer-default-export
};
