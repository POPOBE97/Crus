<template>
  <main>
    <scrolling-text-data-view v-if="showTextView" :items="formatedItems"></scrolling-text-data-view>
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
      mode: 'text', // ['text']
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
      return buffer.toString()
    },
    formatAndUpdateItems (s, l, bufferArray) {
      for (let i = s; i < s + l; i++) {
        const r = this.formatItem(bufferArray[i])
        this.formatedItems.push({
          id: this.formatedItems.length,
          left: this.getTimestamp(),
          right: r,
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