<template>
  <v-system-bar :fixed="true">
    <Label hierachy="paragraph">Ruiyao</Label>
    <v-spacer> </v-spacer>
    <Label hierachy="paragraph">{{ dateString }}</Label>
  </v-system-bar>
</template>

<script>
  import Label from './Label'
  const formatDate = require('../../helper/FormatDate.js')
  
  export default {
    name: 'status-bar',
    components: { Label },
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
