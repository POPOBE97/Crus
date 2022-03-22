<template>
  <main style="padding: 8px;">
    <v-list nav dense style="padding: 0;">
      <v-list-item-group mandatory color="indigo">
        <!-- <router-link v-for="(item, i) in menu" :key="item.id" :to="item.link" push active> -->
          <v-list-item v-for="(item, i) in menu" :key="item.id" :to="item.link" push dense :disabled="item.inactive" :inactive="item.inactive"  >
            <v-list-item-content>
              <Label hierachy="paragraph">{{ item.title }}</Label>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->
      </v-list-item-group>
    </v-list>
  </main>
</template>

<script>
  import Label from '../sections/Label'
  import KeyboardResponder from '../modules/KeyboardResponder'
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  const {ipcRenderer} = require('electron')

  const getSiblingRoutes = require('../../../helper/GetSiblingRoutes')

  export default {
    name: 'home-page',
    components: {
      Label
    },
    extends: KeyboardResponder,
    mixins: [ActionBarDelegate],
    data () {
      return {
        path: this.$route.fullPath
      }
    },
    computed: {
      menu: function () {
        var m = []
        const l = getSiblingRoutes(this.$router.options.routes, this.$route)
        if (l !== undefined) {
          l.forEach(child => {
            m.push({
              title: child.title,
              inactive: child.path === this.$route.path,
              link: child.path
            })
          })
        }
        console.log(m)
        return m
      }
    },
    methods: {
      keyup (key, event) {
        console.log('MindFlakePage', 'keyup', key)
        switch (key) {
          case 'X':
            console.log('Test:', 'pressed "X"')
            this.$router.push({
              path: '/test'
            })
            break
          case '<escape>':
            ipcRenderer.send('exit')
            break
          case '<down>':
            // TODO: send tab key
            break
          default:
            break
        }
      },
      setupActionBar () {
        this.configureActionBarKeys({
          x: {
            visible: true,
            label: '系统信息'
          },
          a: {
            visible: false
          },
          b: {
            visible: false
          },
          y: {
            visible: false
          }
        })
      }
    },
    mounted () {
      this.setupActionBar()
    }
  }
</script>

<style scoped>
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