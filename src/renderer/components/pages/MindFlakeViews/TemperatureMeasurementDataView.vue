<template>
  <main>
    <scrolling-text-data-view v-if="showTextView" :items="formatedItems"></scrolling-text-data-view>
    <line-chart-view v-if="showLineChartView"></line-chart-view>
  </main>
</template>

<script>
import LineChartView from '../../sections/LineChartView'
import ScrollingTextDataView from '../../sections/ScrollingTextDataView'

export default {
  components: { ScrollingTextDataView, LineChartView },
  props: ['items'],
  watch: {
    'items.length': function (newVal, oldVal) {
      this.formatAndUpdateItems(oldVal, newVal, this.items)
    }
  },
  data () {
    return {
      mode: 'text', // ['text', 'lineChart']
      formatedItems: []
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
    },
    formatAndUpdateItems (s, l, bufferArray) {
      for (let i = s; i < s + l; i++) {
        const r = this.formatItem(bufferArray[i])
        if (!r) continue
        const s = `${r.toFixed(2)}`
        this.formatedItems.push({
          id: this.formatedItems.length,
          left: this.getTimestamp(),
          right: s,
          data: r
        })
      }
    }
  },
  mounted () {
    this.formatAndUpdateItems(0, this.items.length, this.items)
  }
}
</script>

<style>

</style>