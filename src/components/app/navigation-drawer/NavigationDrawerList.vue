<template>
  <v-list flat>

    <slot></slot>

  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavagationDrawerList',
});
</script>
