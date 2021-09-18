<template>
    <main style="padding: 8px;">
      <Label hierachy="title">Welcome to my first Electron App</Label>
    </main>
</template>

<script>
  import Label from './Label'
  import KeyboardResponder from './KeyboardResponder'
  const {ipcRenderer} = require('electron')

  export default {
    name: 'home-page',
    components: {Label},
    extends: KeyboardResponder,
    methods: {
      keyup (key, event) {
        switch (key) {
          case 'X':
            console.log('Test:', 'pressed "X"')
            this.$router.push({ path: '/test' })
            break
          case '<escape>':
            ipcRenderer.send('exit')
            break
          default:
            break
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
     font-family: 'Source Sans Pro', sans-serif; 
  }

</style>

<style lang="scss" scoped>
  @import "../styles/typologies.scss";
</style>