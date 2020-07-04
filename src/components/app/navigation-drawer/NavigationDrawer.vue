<!-- ナビゲーションドロワー -->

<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :width="width"
    app
    clipped
    fixed>

    <slot></slot>

  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavigationDrawer',

  props: {
    value: {
      type: Boolean,
    },

    width: {
      type: Number,
      default: 200,
    },
  },
});
</script>
