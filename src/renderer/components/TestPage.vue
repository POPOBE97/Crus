<template>
  <main style="padding: 8px;">
    <div>
      <p class="text title">
        Test Page
      </p>
      <system-information></system-information>
    </div>
  </main>
</template>

<script>
  import SystemInformation from './SystemInformation'
  import StatusBar from './StatusBar'
  import KeyboardResponder from './KeyboardResponder'

  export default {
    name: 'test-page',
    components: {SystemInformation, StatusBar},
    extends: KeyboardResponder,
    data () {
      return {
        debugMessage: ''
      }
    },
    methods: {
      keyup (key, event) {
        switch (key) {
          case '<escape>':
            this.$router.go(-1)
            break
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/typologies.scss";
</style>
