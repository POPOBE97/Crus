<template>
    <main style="padding: 8px;">
      <div>
        <Label hierachy="title">Welcome to my first Electron App</Label>
      </div>
      <div style="padding-top: 8px;">
        <router-link to="/test">
          <v-btn small text outlined><Label hierachy="footnote">See more information</Label></v-btn>
        </router-link>
      </div>
    </main>
</template>

<script>
  import Label from './Label'

  export default {
    name: 'home-page',
    components: {Label},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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