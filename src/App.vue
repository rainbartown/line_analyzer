<template>
  <v-app>
    <!-- アプリケーションバー -->
    <app-bar>
      <app-bar-navigation-icon @click="onClickNavigationIcon" />
      <app-bar-title :title="appBarTitle" />
      <v-spacer></v-spacer>
      <file-picker-button />
    </app-bar>

    <!-- ナビゲーションドロワー -->
    <navigation-drawer v-model="isDrawerOpen">
      <navigation-drawer-list>
        <navigation-drawer-list-item
          v-for="item in drawerListItems"
          :key="item.title"
          :icon="item.icon"
          :title="item.title"
          :to="item.to"
          :disabled="item.disabled"
        />
      </navigation-drawer-list>
    </navigation-drawer>

    <!-- コンテンツ -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  AppBar,
  AppBarNavigationIcon,
  AppBarTitle,
} from '@/components/app/app-bar';
import {
  NavigationDrawer,
  NavigationDrawerList,
  NavigationDrawerListItem,
} from '@/components/app/navigation-drawer';
import FilePickerButton from '@/components/form-input/FilePickerButton.vue';

interface DrawerListItem {
  to: string;
  icon: string;
  title: string;
  disabled: boolean;
}

interface Data {
  isDrawerOpen: boolean | null;
}

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    AppBarNavigationIcon,
    AppBarTitle,
    NavigationDrawer,
    NavigationDrawerList,
    NavigationDrawerListItem,
    FilePickerButton,
  },

  data: (): Data => ({
    // 初期値をnullにするとモバイルでは閉じた状態、デスクトップでは開いた状態で
    // ドロワーが初期化される。
    isDrawerOpen: null,
  }),

  computed: {
    talkName(): string {
      return this.$store.getters['line/talkName'];
    },

    hasLineTalkData(): boolean {
      return this.$store.getters['line/hasData'];
    },

    appBarTitle(): string {
      if (this.hasLineTalkData) return this.talkName;
      return 'LINE Analyzer';
    },

    drawerListItems(): DrawerListItem[] {
      return [
        {
          to: '/',
          icon: 'mdi-home',
          title: 'Home',
          disabled: false,
        },
        {
          to: '/history',
          icon: 'mdi-calendar-clock',
          title: 'History',
          disabled: !this.hasLineTalkData,
        },
        {
          to: '/table',
          icon: 'mdi-table',
          title: 'Table',
          disabled: !this.hasLineTalkData,
        },
        {
          to: '/chart',
          icon: 'mdi-chart-line',
          title: 'Chart',
          disabled: !this.hasLineTalkData,
        },
      ];
    },
  },

  methods: {
    onClickNavigationIcon(): void {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  },

  watch: {
    hasLineTalkData(hasData: boolean): void {
      if (hasData) {
        this.isDrawerOpen = true;
      }
    },
  },
});
</script>
