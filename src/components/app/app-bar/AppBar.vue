<!-- アプリケーションバー -->

<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    fixed>

    <slot></slot>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',
});
</script>
