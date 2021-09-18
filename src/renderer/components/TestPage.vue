<template>
  <main style="padding: 8px;">
    <div>
      <p class="text title">
        Test Page
      </p>
      <system-information></system-information>
      <div style="padding-top: 8px;">
        <Label hierachy="heading3">Key stroke:</Label>
        <Label hierachy="paragraph">{{ debugMessage }}</Label>
      </div>
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
    data () {
      return {
        debugMessage: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    mounted: function () {
      const self = this
      const keyevents = require('key-events')
      var keys = keyevents()
      keys.on('keyup', function (key, event) {
        self.debugMessage = key
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/typologies.scss";
</style>
