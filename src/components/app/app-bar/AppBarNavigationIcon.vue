<!-- アプリケーションバーのナビゲーションアイコン -->

<template>
  <v-app-bar-nav-icon
    v-on="$listeners"
    class="white--text">
  </v-app-bar-nav-icon>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBarNavigationIcon',
});
</script>
