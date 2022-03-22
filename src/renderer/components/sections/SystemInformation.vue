<template>
  <div>
    <Label hierachy="subtitle">Information</Label>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Path:</Label>
      <Label hierachy="paragraph">{{ path }}</Label>
    </div>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Route Name:</Label>
      <Label hierachy="paragraph">{{ name }}</Label>
    </div>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Vue version:</Label>
      <Label hierachy="paragraph">{{ vue }}</Label>
    </div>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Electron version:</Label>
      <Label hierachy="paragraph">{{ electron }}</Label>
    </div>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Node version:</Label>
      <Label hierachy="paragraph">{{ node }}</Label>
    </div>
    <div style="padding-top: 8px;">
      <Label hierachy="paragraph">Platform:</Label>
      <Label hierachy="paragraph">{{ platform }}</Label>
    </div>
  </div>
</template>

<script>
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  import KeyboardResponder from '../modules/KeyboardResponder'
  import Label from './Label'
  export default {
    extends: KeyboardResponder,
    mixins: [ActionBarDelegate],
    name: 'system-information',
    components: { Label },
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    },
    mounted () {
      this.setupActionBar()
    }
  }
</script>

<style scoped>
</style>
