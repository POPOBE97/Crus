<template>
  <main>
    <scrolling-text-data-view v-if="showTextView" :items="items"></scrolling-text-data-view>
    <line-chart-view v-if="showLineChartView"></line-chart-view>
  </main>
</template>

<script>
import LineChartView from '../../sections/LineChartView'
import ScrollingTextDataView from '../../sections/ScrollingTextDataView'

export default {
  components: { ScrollingTextDataView, LineChartView },
  props: ['buffer'],
  watch: {
    buffer: function (newVal, oldVal) {
      const r = this.formatItem(newVal)
      const t = this.getTimestamp()
      this.items.push({
        id: t,
        left: t,
        right: `${r.toFixed(2)}`,
        data: r
      })
      if (this.items.length > 100) { this.items.shift() }
    }
  },
  data () {
    return {
      mode: 'text', // ['text', 'lineChart']
      items: []
    }
  },
  computed: {
    showTextView: function () {
      return this.mode === 'text'
    },
    showLineChartView: function () {
      return this.mode === 'lineChart'
    }
  },
  methods: {
    getTimestamp () {
      const d = new Date()
      return d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds().toString().slice(0, 2)
    },
    formatItem (buffer) {
      if (!buffer) return
      const v = new DataView(buffer.buffer)
      var d = []
      for (let i = 0; i < 1; i++) {
        const r = v.getFloat32(i * 4, true)
        d.push(r)
      }
      return d[0]
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>