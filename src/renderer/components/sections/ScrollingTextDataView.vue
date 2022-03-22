<template>
  <DynamicScroller :items="items" :min-item-size="itemHeight" ref="scroller" style="height: 100%;">
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <v-list-item dense style="min-height: 0px;">
          <v-list-item-content style="padding: 0;">
            <v-list-item-title><Label hierachy="paragraph">{{ item.left }}</Label></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action style="margin: 0;">
            <Label hierachy="paragraph">{{ item.right }}</Label>
          </v-list-item-action>
        </v-list-item>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script>
import Label from './Label'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  name: 'scrolling-text-data-view',
  components: {
    Label
  },
  props: {
    items: {default: () => {
      return [{
        id: 0,
        left: 'test-left',
        right: 'test-right'
      }]
    },
    type: Array},
    itemHeight: {default: 44, type: Number}
  },
  watch: {
    items: function (newVal, oldVal) {
      this.$refs.scroller.scrollToBottom()
    }
  }
}
</script>

<style>
</style>