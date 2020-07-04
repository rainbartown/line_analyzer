<!-- アプリケーションバーのタイトル -->

<template>
  <v-toolbar-title
    class="headline font-weight-regular white--text">
    {{ title }}
  </v-toolbar-title>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBarTitle',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
