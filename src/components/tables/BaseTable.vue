<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :mobile-breakpoint="0"
    disable-pagination
    hide-default-footer
    no-data-text="データがありません"
    v-bind="$attrs"
  ></v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseTable',

  props: {
    headers: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },
});
</script>
