<!-- リストから選択 -->

<template>
  <v-select
    :value="value"
    @input="$emit('input', $event)"
    :items="items"
    :label="label"
    v-bind="$attrs">
  </v-select>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SelectList',

  props: {
    value: {
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },
});
</script>
