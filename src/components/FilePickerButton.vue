<!-- ファイル選択のボタン -->

<template>
  <span>
    <v-btn
      class="text-capitalize"
      @click="$refs.filePicker.click()">
      select file
    </v-btn>
    <input
      type="file"
      accept="text/plain"
      ref="filePicker"
      v-show="false"
      @change="onChange">
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FilePickerButton',

  methods: {
    loadTalkFile(file: File): void {
      this.$store.dispatch('line/loadTalkFile', file);
    },

    onChange(event: Event): void {
      const { target } = event;

      if (target instanceof HTMLInputElement && target.files?.length === 1) {
        const file = target.files[0];
        this.loadTalkFile(file);
      }
    },
  },
});
</script>
