<template>
  <main>
    <scrolling-text-data-view v-if="showTextView" :items="items"></scrolling-text-data-view>
    <line-chart-view v-if="showLineChartView"></line-chart-view>
    <three-render-view v-if="showRenderView"
      :filePath="renderParameters.filePath"
      :rotation="renderParameters.rotation"
      :position="renderParameters.position"
      style="height: 100%;">
    </three-render-view>

  </main>
</template>

<script>
import LineChartView from '../../sections/LineChartView'
import ScrollingTextDataView from '../../sections/ScrollingTextDataView'
import ThreeRenderView from '../../sections/ThreeRenderView'

export default {
  components: { ScrollingTextDataView, LineChartView, ThreeRenderView },
  props: ['buffer'],
  watch: {
    buffer: function (newVal, oldVal) {
      const r = this.formatItem(newVal)
      const t = this.getTimestamp()
      this.items.push({
        id: t,
        left: t,
        right: `${r.pitch.toFixed(2)} ${r.roll.toFixed(2)}`,
        data: r
      })
      if (this.items.length > 100) { this.items.shift() }
      this.renderParameters.rotation.x = r.pitch / 180 * Math.PI
      this.renderParameters.rotation.z = r.roll / 180 * Math.PI
      this.renderParameters.rotation.y = Math.PI
    }
  },
  data () {
    return {
      mode: 'render', // ['text', 'lineChart']
      items: [],
      renderParameters: {
        filePath: '/static/Pulse Reader Outlined.glb',
        rotation: {x: 0, y: 0, z: 0},
        position: {x: 0, y: 0, z: 0}
      }
    }
  },
  computed: {
    showTextView: function () {
      return this.mode === 'text'
    },
    showLineChartView: function () {
      return this.mode === 'lineChart'
    },
    showRenderView: function () {
      return this.mode === 'render'
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
      for (let i = 0; i < 2; i++) {
        const r = v.getFloat32(i * 4, true)
        d.push(r)
      }
      return {pitch: d[0], roll: d[1]}
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>