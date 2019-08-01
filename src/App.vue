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
      <v-list>
        <v-list-item
          class="black--text"
          v-for="page in pages"
          :key="page.title"
          :to="page.path"
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

<script>
import { mapGetters } from 'vuex';
import FilePicker from '@/components/FilePicker.vue';

export default {
  name: 'App',
  components: {
    FilePicker,
  },
  data() {
    return {
      drawer: null,
      pages: [
        {
          action: 'mdi-home',
          title: 'Home',
          path: '/',
        },
        {
          action: 'mdi-calendar-clock',
          title: 'History',
          path: '/history',
        },
        {
          action: 'mdi-table',
          title: 'Table',
          path: '/table',
        },
        {
          action: 'mdi-chart-line',
          title: 'Chart',
          path: '/chart',
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'talkName',
    ]),
    title() {
      if (this.talkName.length > 0) return `${this.talkName}のトーク`;
      return 'LINE Analyzer';
    },
  },
};
</script>

<style scoped>
</style>
