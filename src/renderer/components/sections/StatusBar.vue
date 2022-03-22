<template>
  <v-system-bar :fixed="true">
    <Label hierachy="paragraph">{{ userString }}</Label>
    <Label hierachy="paragraph" style="padding: 5px;"></Label>
    <Label hierachy="paragraph">{{ pathString }}</Label>
    <v-spacer> </v-spacer>
    <Label hierachy="paragraph">{{ dateString }}</Label>
  </v-system-bar>
</template>

<script>
  import Label from './Label'
  const formatDate = require('../../../helper/FormatDate')
  const formatPathFromVueRouter = require('../../../helper/FormatPathFromVueRouter')
  
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
      },
      pathString: function () {
        return formatPathFromVueRouter(this.$route)
      },
      userString: function () {
        return 'Ruiyao'
      }
    }
  }
</script>

<style scoped>
</style>
