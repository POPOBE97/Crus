<template>
  <div>
    <StatusBar></StatusBar>
    <v-slide-x-reverse-transition :leave-absolute="true" :hide-on-leave="true">
      <router-view style="background-color: white; margin-top: 24px;"></router-view>
    </v-slide-x-reverse-transition>
    <ActionBar></ActionBar>
  </div>
</template>

<script>
  import StatusBar from './StatusBar'
  import Label from './Label'
  import ActionBar from './ActionBar.vue'

  export default {
    name: 'root-page',
    components: { StatusBar, Label, ActionBar }
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

<style lang="scss">
  @import "../styles/typologies.scss";
</style>