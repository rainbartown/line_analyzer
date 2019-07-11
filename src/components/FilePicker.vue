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

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    onChange(event) {
      const file = event.target.files[0];
      this.read(file);
    },
    ...mapActions([
      'read',
    ]),
  },
};
</script>
