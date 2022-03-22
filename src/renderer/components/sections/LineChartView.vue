<template>
  <canvas ref="canvas" height="100%">

  </canvas>
</template>

<script>
import Chart from 'chart.js'

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.closePath()
  return this
}

const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw (chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart
    ctx.save()
    ctx.strokeStyle = options.borderColor
    ctx.lineWidth = options.borderWidth
    ctx.setLineDash(options.borderDash || [])
    ctx.lineDashOffset = options.borderDashOffset
    ctx.roundRect(left, top, width - 1, height, 5).stroke()
    ctx.restore()
  }
}

const config = {
  type: 'line',
  data: {
    labels: [1, 2, 3],
    datasets: [
      {
        data: [1, 2, 1],
        borderColor: '#000000',
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      }
    ]
  },
  options: {
    pointRadius: 0,
    borderWidth: 2,
    animation: false,
    responsive: true,
    plugins: {
      chartAreaBorder: {
        borderColor: '#000000',
        borderWidth: 2
      },
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 3 / 4
        }
      }
    }
  },
  plugins: [chartAreaBorder]
}

export default {
  name: 'line-char-view',
  props: {
  },
  data () {
    return {
      config: config,
      chart: null
    }
  },
  mounted () {
    const canvas = this.$refs.canvas
    this.chart = new Chart(canvas, this.config)
  }
}
</script>

<style>

</style>