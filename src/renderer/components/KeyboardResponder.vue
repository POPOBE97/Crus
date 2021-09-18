<script>
  const keyevents = require('key-events')
  const os = require('os').platform()
  const keymap = {
    'O': 'A',
    'K': 'B',
    'I': 'X',
    'J': 'Y'
  }
  export default {
    name: 'keyboard-responder',
    data () {
      return {
        keys: null
      }
    },
    methods: {
      keydown (key, event) {
      },
      keyup (key, event) {
      }
    },
    mounted: function () {
      this.keys = (this.keys === null ? keyevents() : this.keys)
      this.keys.on('keyup', (key, event) => {
        key = (os !== 'darwin' ? key : (keymap[key] ? keymap[key] : key))
        this.keyup(key, event)
      })
      this.keys.on('keydown', (key, event) => {
        key = (os !== 'darwin' ? key : (keymap[key] ? keymap[key] : key))
        this.keydown(key, event)
      })
    },
    destroyed: function () {
      this.keys.removeAllListeners('keydown')
      this.keys.removeAllListeners('keyup')
    }
  }
</script>

<style scoped>
  .sticky-bottom {
    top: calc(100% - 24px);
    width: 100%;
    position: fixed;
  }
</style>
