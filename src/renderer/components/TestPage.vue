<template>
  <div id="wrapper">
    <StatusBar></StatusBar>
    <main>
      <router-link to="/">
        <v-btn small text>Back</v-btn>
      </router-link>
      <div>
        <p class="text title">
          Test Page
        </p>
        <system-information></system-information>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './SystemInformation'
  import StatusBar from './StatusBar'

  export default {
    name: 'test-page',
    components: {SystemInformation, StatusBar},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/typologies.scss";
</style>
