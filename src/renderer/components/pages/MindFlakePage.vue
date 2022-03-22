<template>
  <main style="padding: 8px; height: calc(100vh - 48px); overflow-y: scroll;">
    <!-- Dialog -->
    <v-dialog v-model="dialog.show" width="500" attach="main" :transition="false" :persistent="true">
      <v-card>
        <v-card-title>
          <Label hierachy="heading1">{{ dialog.title }}</Label>
        </v-card-title>
        <v-list nav dense style="padding: 10px 24px 16px;">
          <v-list-item-group color="indigo" :value="dialog.selection">
            <template v-for="(d, i) in dialog.data">
              <v-list-item dense :ripple="false" :key="i">
                <v-list-item-content>
                  <Label hierachy="paragraph">{{ d.advertisement.localName }}</Label>
                </v-list-item-content>
                <v-list-item-action-text>
                  <Label hierachy="caption">{{ d.id }}</Label>
                </v-list-item-action-text>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    
    <!-- Content Body -->
    <v-list nav dense style="padding: 0">
      <v-list-item-group color="indigo">
        <v-subheader><Label hierachy="caption">BLE Connection</Label></v-subheader>
        <v-list-item dense :ripple="false" :inactive="true">
          <v-list-item-content>
            <Label hierachy="paragraph">Device Name</Label>
          </v-list-item-content>
          <v-list-item-action-text>
            <Label hierachy="caption">{{ BLEDevice.peripheral ? BLEDevice.peripheral.advertisement.localName : 'no device' }}</Label>
          </v-list-item-action-text>
        </v-list-item>

        <v-list-item dense :ripple="false" :inactive="true">
          <v-list-item-content>
            <Label hierachy="paragraph">State</Label>
          </v-list-item-content>
          <v-list-item-action-text>
            <Label hierachy="caption">{{ BLEDevice.peripheral ? BLEDevice.peripheral.state : 'not found' }}</Label>
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <div style="display: flex; flex-direction; row; padding-top: 10px; gap: 10px; max-height: 400px; height: 100%;">
      <!-- nav menu -->
      <v-list nav dense style="padding: 0;">
        <v-list-item-group color="indigo">
          <template v-for="(c, i) in BLEDevice.characteristics">
            <v-list-item dense :ripple="false" :key="i">
              <v-list-item-content>
                <Label hierachy="paragraph">{{ c.name || c.uuid }}</Label>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <div style="padding: 8px; flex: auto; border-radius: 5px; border-width: 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.05);">
        <scrolling-text-data-view :items="[{id: 0, left: 'test', right: 'test'}]">
        </scrolling-text-data-view>
      </div>
    </div>
  </main>
</template>

<script>
  import Label from '../sections/Label'
  import KeyboardResponder from '../modules/KeyboardResponder'
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  import ScrollingTextDataView from '../sections/ScrollingTextDataView'

  const noble = require('@abandonware/noble')

  var dialog = {
    show: false,
    title: '符合条件的设备',
    subtitle: '只有广播服务中有\'180D\'的设备才会被显示',
    data: [],
    selection: -1
  }

  var deviceInfo = {
    name: '',
    state: 'not found',
    connected: false,
    services: [],
    characteristics: [],
    peripheral: null
  }

  noble.on('stateChange', async (state) => {
    console.log('noble state: ', state)
  })

  noble.on('scanStart', () => {
    console.log('noble', 'Scanning BLE devices')
  })

  noble.on('discover', async (peripheral) => {
    console.log('Found: ', peripheral)
    deviceInfo.state = 'found'
    dialog.data.push(peripheral)
  })

  export default {
    name: 'mind-flake-page',
    components: {
      Label,
      ScrollingTextDataView
    },
    extends: KeyboardResponder,
    mixins: [ActionBarDelegate],
    data () {
      return {
        path: this.$route.fullPath,
        BLEDevice: deviceInfo,
        dialog: dialog
      }
    },
    watch: {
      '$route' () {
        console.log(this.$route)
      }
    },
    computed: {
    },
    methods: {
      peripheralDisconnected () {
        deviceInfo.name = ''
        deviceInfo.serviceID = ''
        deviceInfo.state = null
        deviceInfo.connected = false
        deviceInfo.characteristics = []
        deviceInfo.peripheral = null

        this.updateActionBarKeysConfiguration()
      },
      peripheralConnected () {
        deviceInfo.state = 'connected'
        // Fetch characteristics
        this.BLEDevice.peripheral.discoverAllServicesAndCharacteristics((_, services, characteristics) => {
          this.BLEDevice.characteristics = characteristics
          this.updateActionBarKeysConfiguration()
        })
      },
      updateActionBarKeysConfiguration () {
        if (!this.dialog.show) {
          this.configureActionBarKeys({
            x: {visible: this.BLEDevice.peripheral !== null && this.BLEDevice.peripheral.state === 'connected', label: '断开'},
            y: {visible: true, label: this.BLEDevice.peripheral === null ? '扫描' : '字段信息'},
            a: {visible: false},
            b: {visible: false}
          })
        } else {
          this.configureActionBarKeys({
            x: {visible: false},
            y: {visible: false},
            b: {visible: true, label: '取消'},
            a: {visible: this.dialog.selection !== -1, label: '连接'}
          })
        }
      },
      openDeviceSelectionDialog () {
        this.dialog.show = true
        this.pushActionBarKeysConfiguration()
        this.updateActionBarKeysConfiguration()
      },
      closeDeviceSelectionDialog () {
        this.dialog.show = false
        this.dialog.data = []
        this.dialog.selection = -1
        this.popActionBarKeysConfiguration()
      },
      keyup (key, event) {
        console.log('MindFlakePage', this.dialog.show)
        console.log('MindFlakePage', 'keyup', key)
        switch (key) {
          case 'A':
          case '<enter>':
            if (this.dialog.show === true && this.dialog.selection !== -1) {
              if (this.dialog.selection >= 0 && this.dialog.selection < this.dialog.data.length) {
                this.BLEDevice.peripheral = this.dialog.data[this.dialog.selection]
              }
              this.BLEDevice.peripheral.once('connect', this.peripheralConnected)
              this.BLEDevice.peripheral.once('disconnect', this.peripheralDisconnected)

              this.BLEDevice.peripheral.connect()
              this.closeDeviceSelectionDialog()
            }
            break
          case 'B':
            if (dialog.show === true) {
              this.closeDeviceSelectionDialog()
              noble.stopScanning()
            } else {
              this.$router.go(-1)
            }
            break
          case '<escape>':
            if (dialog.show === true) {
              this.closeDeviceSelectionDialog()
              noble.stopScanning()
            } else {
              this.$router.go(-1)
            }
            break
          case 'Y':
            if (this.BLEDevice.state !== 'connected') {
              this.openDeviceSelectionDialog()
              this.scanBLE()
            } else {
              // TODO: show characteristic infos
            }
            break
          case 'X':
            if (this.BLEDevice.state === 'connected') {
              this.disconnectPeripherals()
              this.BLEDevice.state = 'disconnected'
              this.BLEDevice.characteristics = []
            }
            break
          case '<up>':
            if (this.dialog.show && this.dialog.data.length) {
              this.dialog.selection--
              this.dialog.selection %= this.dialog.data.length
              this.updateActionBarKeysConfiguration()
            }
            break
          case '<down>':
            if (this.dialog.show && this.dialog.data.length) {
              this.dialog.selection++
              this.dialog.selection %= this.dialog.data.length
              this.updateActionBarKeysConfiguration()
            }
            break
          default:
            break
        }
      },
      setupActionBar () {
        this.updateActionBarKeysConfiguration()
      },
      scanBLE () {
        // Scan for heart rate measuring ble peripherals
        noble.startScanningAsync([
          '180d' // heart rate measurement service
        ], false)
      },
      disconnectPeripherals () {
        if (this.BLEDevice.peripheral !== null) {
          this.BLEDevice.peripheral.disconnect()
        }
      },
      characteristicHandler (cIndex) {
        const c = this.BLEDevice.characteristics[cIndex]

        // Read
        var n = 0
        c.read((e, data) => {
          n = parseInt(data.toString('hex'), 16)

          // Toggle state
          n = (n === 0 ? 1 : 0)

          const b = Buffer.alloc(1)
          b.writeUint8(n)
          c.write(b, false)
        })
      }
    },
    mounted () {
      this.setupActionBar()
    },
    unmounted () {
      console.log('Clean up...')
      this.disconnectPeripherals()
    }
  }
</script>

<style scoped>
  main >>> .v-dialog {
    box-shadow: none;
    border: solid 1px black;
  }
</style>

<style lang="scss" scoped>
  @import "../../styles/typologies.scss";
</style>