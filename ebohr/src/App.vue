<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link @click="toHome">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>查询发行量</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toInvIndex">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>增值税发票预约</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#01a29a" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <!-- <v-footer color="#01a29a" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    drawer: null,
    appTitle: 'Application',
  }),

  methods: {
    toHome() {
      this.alertError = true
      this.errorMsg = 'Home'
      this.appTitle = 'Application'
      this.drawer = !this.drawer
      this.$router.push('/')
    },
    toInvIndex() {
      this.appTitle = '增值税专用发票预约'
      this.drawer = !this.drawer
      this.$router.push('/inv')
    },
  },
}
</script>
