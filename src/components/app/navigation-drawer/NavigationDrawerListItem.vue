<!--
  ナビゲーションドロワーのリスト中アイテム
  アイコンとテキストで表示されるリンク
-->

<template>
  <v-list-item
    :to="to"
    active-class="primary--text text--darken-2"
    v-bind="$attrs">

    <!-- アイコン -->
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>

    <!-- テキスト -->
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>

  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavigationDrawerListItem',

  props: {
    to: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    hasLineTalkData(): boolean {
      return this.$store.getters['line/hasData'];
    },
  },
});
</script>
