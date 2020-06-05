<template>
  <span>
    <v-btn
      class="text-capitalize"
      @click="$refs.filePicker.click()"
    >
      select file
    </v-btn>
    <input
      type="file"
      v-show="false"
      ref="filePicker"
      @change="onChange"
    >
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  methods: {
    onChange(event: Event): void {
      const { target } = event;
      if (target instanceof HTMLInputElement && target.files !== null) {
        const file = target.files[0];
        this.read(file);
      }
    },
    ...mapActions([
      'read',
    ]),
  },
});
</script>
