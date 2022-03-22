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
        right: `${r.heartRate} ${r.rrInterval}`,
        data: r
      })
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
      return {
        flag: v.getUint8(0, true),
        heartRate: v.getUint32(4, true),
        rrInterval: v.getUint32(8, true)
      }
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>