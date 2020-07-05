<!-- タイトルテキスト -->
<template>
  <h1 class="title font-weight-bold" :class="classObject">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TitleText',

  props: {
    classObject: {
      type: Object,
      required: false,
    },
  },
});
</script>
