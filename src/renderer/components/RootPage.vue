<template>
  <div>
    <StatusBar></StatusBar>
    <v-slide-x-reverse-transition :leave-absolute="true">
      <router-view style="background-color: white;"></router-view>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
  import StatusBar from './StatusBar'
  import Label from './Label'

  export default {
    name: 'root-page',
    components: { StatusBar, Label }
  }
</script>

<style>

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