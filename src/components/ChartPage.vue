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
    <v-layout
      v-if="hasData"
      wrap
      >
      <v-flex xs12>
        <SpeakerPieChart v-if="selectedKey.value === 'speaker'"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SpeakerPieChart from '@/components/charts/SpeakerPieChart';

export default {
  name: 'ChartPage',
  components: {
    SpeakerPieChart,
  },
  data: () => ({
    selectedKey: { label: '発言者', value: 'speaker' },
    keys: [
      { label: '発言者', value: 'speaker' },
    ],
  }),
  computed: {
    ...mapGetters([
      'messages',
    ]),
    hasData() {
      return (this.messages.length > 0);
    },
  },
};
</script>
