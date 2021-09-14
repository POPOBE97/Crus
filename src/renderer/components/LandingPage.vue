<template>
  <div>
    <StatusBar></StatusBar>
    <v-container fluid>
      <v-row>
        <v-col class="pa-8">
          <span class="text title">
            Project
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-8">
          <router-link to="/test">
            <v-btn small text outlined>See more information</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import SystemInformation from './SystemInformation'
  import StatusBar from './StatusBar'

  export default {
    name: 'landing-page',
    components: {SystemInformation, StatusBar},
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
  
  @mixin pa-0 {
    padding: 0px;
  }

  .px-8 {
    @include pa-0;
    padding-left: 8px;
    padding-right: 8px;
  }

  .pa-8 {
    padding: 8px;
  }
</style>