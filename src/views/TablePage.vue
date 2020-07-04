<template>
  <v-container>
    <v-layout wrap >
      <v-flex xs4>
        <select-list
          v-model="tableComponent"
          :items="selectListItems"
          label="キー"
        />
      </v-flex>
      <v-flex xs12>
        <sender-table v-if="tableComponent === 'SenderTable'" />
        <hour-table v-else-if="tableComponent === 'HourTable'" />
        <day-of-week-table v-else-if="tableComponent === 'DayOfWeekTable'" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SenderTable from '@/components/tables/SenderTable.vue';
import HourTable from '@/components/tables/HourTable.vue';
import DayOfWeekTable from '@/components/tables/DayOfWeekTable.vue';
import SelectList from '@/components/SelectList.vue';

const tableComponents = {
  SenderTable,
  HourTable,
  DayOfWeekTable,
} as const;

type TableComponent = keyof typeof tableComponents;

interface SelectListItem {
  readonly text: string;
  readonly value: TableComponent;
}

interface Data {
  readonly tableComponent: TableComponent;
  readonly selectListItems: SelectListItem[];
}

export default Vue.extend({
  name: 'TablePage',

  components: {
    SelectList,
    ...tableComponents,
  },

  data(): Data {
    return {
      tableComponent: 'SenderTable',

      selectListItems: [
        { text: '送信者', value: 'SenderTable' },
        { text: '時間帯', value: 'HourTable' },
        { text: '曜日', value: 'DayOfWeekTable' },
      ],
    };
  },
});
</script>
