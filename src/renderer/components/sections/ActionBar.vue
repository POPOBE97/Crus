<template>
  <v-system-bar class="sticky-bottom">
    <v-img max-height="24" max-width="24" :src="loadImg('icon-navigation')"></v-img>
    <Label style="margin-left: 2px;" hierachy="caption">导航</Label>
    <Label style="margin-left: 8px; max-width: 55px;" hierachy="caption">{{ key.down }}</Label>
    <v-spacer> </v-spacer>
    <v-img v-if="actions.a.visible" style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-a')"></v-img>
    <Label v-if="actions.a.visible" hierachy="caption">{{ actions.a.label }}</Label>

    <v-img v-if="actions.b.visible" style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-b')"></v-img>
    <Label v-if="actions.b.visible"  hierachy="caption">{{ actions.b.label }}</Label>

    <v-img v-if="actions.x.visible"  style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-x')"></v-img>
    <Label v-if="actions.x.visible"  hierachy="caption">{{ actions.x.label }}</Label>

    <v-img v-if="actions.y.visible"  style="margin-left: 8px;" max-height="24" max-width="24" :src="loadImg('icon-key-y')"></v-img>
    <Label v-if="actions.y.visible"  hierachy="caption">{{ actions.y.label }}</Label>
  </v-system-bar>
</template>

<script>
  import Label from '../sections/Label'
  import { mapState } from 'vuex'
  import KeyboardResponder from '../modules/KeyboardResponder'

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
      ...mapState({
        actions: state => state.ui.actionBar.key
      })
    },
    methods: {
      loadImg (name) {
        return require(`../../assets/${name}_${window.devicePixelRatio}x.png`)
      },
      keydown (key, event) {
        this.key.down = key
        this.keyEvent.down = event
      },
      keyup (key, event) {
        this.key.up = key
        this.keyEvent.up = event
      },
      isVisible (key) {
        return this.$store.state.ui.actionBar.key[key].visible
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
