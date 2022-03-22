<template>
  <main style="padding: 8px;">
    <div>
      <system-information></system-information>
      <line-chart-view style="width: 100%; height: 300px;"></line-chart-view>
      <scrolling-text-data-view :items="items" style="height: 100px;"></scrolling-text-data-view>
    </div>
  </main>
</template>

<script>
  import SystemInformation from '../sections/SystemInformation'
  import StatusBar from '../sections/StatusBar'
  import KeyboardResponder from '../modules/KeyboardResponder'
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  import LineChartView from '../sections/LineChartView'
  import ScrollingTextDataView from '../sections/ScrollingTextDataView.vue'

  export default {
    name: 'test-page',
    components: {SystemInformation, StatusBar, LineChartView, ScrollingTextDataView},
    mixins: [KeyboardResponder, ActionBarDelegate],
    data () {
      return {
        debugMessage: '',
        items: []
      }
    },
    methods: {
      updateItems () {
        setTimeout(() => {
          this.items.push({id: this.items.length, left: 'test', right: this.items.length})
          this.updateItems()
        }, 500)
      },
      keyup (key, event) {
        console.log('TestPage', 'keyup', key)
        switch (key) {
          case '<escape>':
            this.$router.go(-1)
            break
        }
      }
    },
    mounted: function () {
      this.updateItems()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/typologies.scss";
</style>
