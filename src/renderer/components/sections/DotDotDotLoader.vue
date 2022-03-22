<template>
  <label hierachy="paragraph">{{ dotdotdot }}</label>
</template>

<script>
import Label from './Label'

export default {
  components: {
    Label
  },
  props: {
    duration: {
      default: 500,
      type: Number
    }
  },
  data () {
    return {
      dotdotdot: '',
      cycleCount: 0,
      shouldCycle: false
    }
  },
  watch: {
    '$route' () {
      console.log('something happend')
    }
  },
  methods: {
    cycle () {
      setTimeout(() => {
        this.cycleCount += 1
        this.cycleCount %= 4
        this.dotdotdot = '.'.repeat(this.cycleCount)
        if (this.shouldCycle) { this.cycle() }
      }, this.duration)
    }
  },
  mounted () {
    this.shouldCycle = true
    this.cycle()
  },
  unmounted () {
    console.log('DotDotDotView', 'disable cycle')
    this.shouldCycle = false
  }
}
</script>

<style>
</style>