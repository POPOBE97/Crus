<template>
  <div>
    <Label hierachy="subtitle">Information</Label>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Path:</Label>
        <Label hierachy="paragraph">{{ path }}</Label>
    </div>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Route Name:</Label>
        <Label hierachy="paragraph">{{ name }}</Label>
    </div>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Vue version:</Label>
        <Label hierachy="paragraph">{{ vue }}</Label>
    </div>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Electron version:</Label>
        <Label hierachy="paragraph">{{ electron }}</Label>
    </div>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Node version:</Label>
        <Label hierachy="paragraph">{{ node }}</Label>
    </div>
    <div style="padding-top: 8px;">
        <Label hierachy="heading3">Platform:</Label>
        <Label hierachy="paragraph">{{ platform }}</Label>
    </div>
  </div>
</template>

<script>
  import Label from './Label'
  export default {
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
    }
  }
</script>

<style scoped>
</style>
