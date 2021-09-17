<template>
  <main style="padding: 8px;">
    <div>
      <p class="text title">
        Test Page
      </p>
      <system-information></system-information>
    </div>
    <div style="padding-top: 8px;">
      <router-link to="/">
        <v-btn small text outlined>Back</v-btn>
      </router-link>
    </div>
  </main>
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
