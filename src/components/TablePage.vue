<template>
  <v-container>
    <v-layout wrap >
      <v-flex xs4>
        <v-select
          v-model="selectedKey"
          item-text="label"
          item-value="value"
          :items="keys"
          label="キー"
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TablePage',
  components: {
  },
  data: () => ({
    selectedKey: { label: '発言者', value: 'speaker' },
    keys: [
      { label: '発言者', value: 'speaker' },
    ],
  }),
};
</script>
