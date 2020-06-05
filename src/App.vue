<template>
  <v-app>
    <!-- ナビゲーションバー -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      clipped
      width=200
    >
      <v-list flat>
        <v-list-item
          v-for="page in pages"
          :key="page.title"
          :to="page.path"
          :disabled="page.disabled"
          active-class="primary--text text--darken-2"
        >
          <v-list-item-action>
            <v-icon>{{ page.action }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      clipped-left
      color="primary"
    >
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer =! drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="headline white--text font-weight-regular">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <FilePicker/>
    </v-app-bar>

    <!-- コンテンツ -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import FilePicker from '@/components/FilePicker.vue';

interface Data {
  drawer: boolean | null;
}

interface DrawerPageListItem {
  action: string;
  title: string;
  path: string;
  disabled: boolean;
}

export default Vue.extend({
  name: 'App',
  components: {
    FilePicker,
  },
  data(): Data {
    return {
      drawer: null,
    };
  },
  computed: {
    ...mapGetters([
      'hasData',
      'showNavIconBadge',
      'talkName',
    ]),
    title(): string {
      if (this.hasData) {
        return this.talkName;
      }
      return 'LINE Analyzer';
    },
    pages(): DrawerPageListItem[] {
      return [
        {
          action: 'mdi-home',
          title: 'Home',
          path: '/',
          disabled: false,
        },
        {
          action: 'mdi-calendar-clock',
          title: 'History',
          path: '/history',
          disabled: !this.hasData,
        },
        {
          action: 'mdi-table',
          title: 'Table',
          path: '/table',
          disabled: !this.hasData,
        },
        {
          action: 'mdi-chart-line',
          title: 'Chart',
          path: '/chart',
          disabled: !this.hasData,
        },
      ];
    },
  },
  methods: {
    onClickNavIcon(): void {
      this.drawer = !this.drawer;
      this.showNavIconBadge(false);
    },
  },
  watch: {
    hasData(val): void {
      if (val) {
        this.drawer = true;
      }
    },
  },
});
</script>
