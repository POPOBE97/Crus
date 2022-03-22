<template>
  <main>
    <scrolling-text-data-view v-if="showTextView" :items="items"></scrolling-text-data-view>
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
        right: r,
        data: r
      })
      if (this.items.length > 100) { this.items.shift() }
    }
  },
  data () {
    return {
      mode: 'text', // ['text']
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
      return buffer.toString()
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>