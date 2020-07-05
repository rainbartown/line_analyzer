<template>
  <v-container>

    <!-- チャートの種類を選択 -->
    <v-layout wrap >
      <v-flex xs4>
        <select-list
          v-model="chartComponent"
          :items="selectListItems"
          label="キー"
        />
      </v-flex>
    </v-layout>

    <!-- チャート -->
    <v-layout wrap>
      <v-flex xs12>
        <component :is="chartComponent" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import chartComponents, { ChartComponent } from '@/components/charts';
import SelectList from '@/components/SelectList.vue';

interface SelectListItem {
  readonly text: string;
  readonly value: ChartComponent;
}

interface Data {
  readonly chartComponent: ChartComponent;
  readonly selectListItems: SelectListItem[];
}

export default Vue.extend({
  name: 'ChartPage',

  components: {
    SelectList,
    ...chartComponents,
  },

  data(): Data {
    return {
      chartComponent: 'SenderPieChart',

      selectListItems: [
        { text: '送信者', value: 'SenderPieChart' },
        { text: '時間帯', value: 'HourBarChart' },
        { text: '曜日', value: 'DayOfWeekBarChart' },
        { text: '時系列', value: 'TimeSeriesLineChart' },
      ],
    };
  },
});
</script>
