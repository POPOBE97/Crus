<template>
  <v-system-bar class="sticky-bottom">
    <v-img max-height="24" max-width="24" :src="loadImg('icon-navigation')"></v-img>
    <Label style="margin-left: 2px;" hierachy="caption">导航</Label>
    <Label style="margin-left: 8px; max-width: 55px;" hierachy="caption">{{ key.down }}</Label>
    <v-spacer> </v-spacer>
    <v-img style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-a')"></v-img>
    <Label hierachy="caption">确认</Label>

    <v-img style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-b')"></v-img>
    <Label hierachy="caption">取消</Label>

    <v-img style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-x')"></v-img>
    <Label hierachy="caption">更多</Label>

    <v-img style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-y')"></v-img>
    <Label hierachy="caption">刷新</Label>
  </v-system-bar>
</template>

<script>
  import Label from './Label'
  import KeyboardResponder from './KeyboardResponder'

  export default {
    name: 'action-bar',
    components: { Label },
    extends: KeyboardResponder,
    data () {
      return {
        key: {up: null, down: null},
        keyEvent: {up: null, down: null}
      }
    },
    computed: {
    },
    methods: {
      loadImg (name) {
        return require(`../assets/${name}_${window.devicePixelRatio}x.png`)
      },
      keydown (key, event) {
        this.key.down = key
        this.keyEvent.down = event
      },
      keyup (key, event) {
        this.key.up = key
        this.keyEvent.up = event
      }
    }
  }
</script>

<style scoped>
  .sticky-bottom {
    top: calc(100% - 24px);
    width: 100%;
    position: fixed;
  }
</style>
