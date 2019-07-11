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
      <v-list color="blue">
        <v-list-tile
          class="black--text"
          v-for="page in pages"
          :key="page.title"
          :to="page.path"
        >
          <v-list-tile-action>
            <v-icon>{{ page.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      clipped-left
      color="primary"
    >
      <v-toolbar-side-icon
        class="white--text"
        @click="drawer =! drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline white--text font-weight-regular">
        LINE Analyzer
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <FilePicker/>
    </v-toolbar>

    <!-- コンテンツ -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import FilePicker from '@/components/FilePicker';

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
          action: 'home',
          title: 'Home',
          path: '/',
        },
        {
          action: 'view_list',
          title: 'Table',
          path: '/Table',
        },
        {
          action: 'timeline',
          title: 'Chart',
          path: '/Chart',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
