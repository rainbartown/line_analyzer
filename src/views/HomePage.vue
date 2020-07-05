<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex>

        <title-text>使い方</title-text>
        <ol>
          <li>LINEアプリでトーク履歴を端末かクラウドにエクスポート</li>
          <li>右上のナビゲーションバーのボタンを押してファイルを選択</li>
          <li>左上の<v-icon>mdi-menu</v-icon>を押してメニューから表示形式を選択</li>
        </ol>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { TitleText } from '@/components/text';

export default Vue.extend({
  name: 'HomePage',

  components: {
    TitleText,
  },
});
</script>
