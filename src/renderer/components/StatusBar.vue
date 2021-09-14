<template>
  <v-system-bar>
    <p>Ruiyao</p>
    <v-spacer> </v-spacer>
    <p>{{ dateString }}</p>
  </v-system-bar>
</template>

<script>
  const formatDate = require('../../helper/FormatDate.js')

  export default {
    data () {
      return {
        date: new Date()
      }
    },
    computed: {
      dateString: function () {
        return formatDate(this.date, 'HH:mm')
      }
    }
  }
</script>

<style scoped>
</style>
