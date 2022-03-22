<script>
  export default {
    name: 'action-deligate',
    data () {
      return {
        actionBarKeysConfigurationStack: []
      }
    },
    methods: {
      setupActionBar () {
        this.configureActionBarKeys({
          a: { label: '确认', visible: false },
          b: { label: '取消', visible: false },
          x: { label: '更多', visible: false },
          y: { label: '刷新', visible: false }
        })
      },
      pushActionBarKeysConfiguration () {
        var state = JSON.parse(JSON.stringify(this.$store.state.ui.actionBar.key))
        this.actionBarKeysConfigurationStack.push(state)
      },
      popActionBarKeysConfiguration () {
        let state = this.actionBarKeysConfigurationStack.pop()
        if (state) {
          this.configureActionBarKeys(state)
        }
      },
      configureActionBarKeys (config) {
        for (const key in config) {
          if (Object.hasOwnProperty.call(config, key)) {
            const info = config[key]
            var nInfo = {visible: undefined, label: undefined}
            for (const attr in info) {
              if (Object.hasOwnProperty.call(info, attr)) {
                nInfo[attr] = info[attr]
              }
            }
            this.configureActionBarKey(key, nInfo.visible, nInfo.label)
          }
        }
      },
      configureActionBarKey (key, visible, label) {
        if (visible !== undefined) {
          this.$store.commit('ui/actionBar/setVisibleForKey', {key: key, visible: visible})
        }
        if (label !== undefined) {
          this.$store.commit('ui/actionBar/setLabelForKey', {key: key, label: label})
        }
      }
    }
  }
</script>

<style scoped>
</style>
