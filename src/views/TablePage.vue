<template>
  <v-container>

    <!-- 表の種類を選択 -->
    <v-layout wrap >
      <v-flex xs4>
        <select-list
          v-model="tableComponent"
          :items="selectListItems"
          label="キー"
        />
      </v-flex>

      <!-- 表 -->
      <v-flex xs12>
        <component :is="tableComponent" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectList from '@/components/form-input/SelectList.vue';
import tableComponents, { TableComponent } from '@/components/tables';

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
