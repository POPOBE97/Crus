<template>
  <main style="padding: 8px; height: calc(100vh - 48px); overflow-y: scroll;">
    <!-- Toast, 提示设备连接状态 -->
    <v-dialog v-model="showToast" width="100" height="44" attach="body" :transition="false" :persistent="true">
      <Label hierachy="paragraph">{{ deviceInfo.state }}</Label>
    </v-dialog>

    <!-- Dialog, 显示扫描设备 -->
    <v-dialog v-model="showScanMenu" width="500" attach="body" :transition="false" :persistent="true">
      <v-card>
        <v-card-title>
          <Label hierachy="heading1">搜索附近支持的设备</Label><dot-dot-dot-loader></dot-dot-dot-loader>
        </v-card-title>
        <v-list nav dense style="padding: 10px 24px 16px;">
          <v-list-item-group color="indigo" :value="scanDialogData.selection">
            <template v-for="(d, i) in scanDialogData.deviceList">
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

    <!-- Info Header, 显示设备信息 -->
    <v-list nav dense style="padding: 0">
      <v-list-item-group color="indigo">
        <v-subheader><Label hierachy="caption">BLE Connection</Label></v-subheader>
        <v-list-item dense :ripple="false" :inactive="true">
          <v-list-item-content>
            <Label hierachy="paragraph">Device Name</Label>
          </v-list-item-content>
          <v-list-item-action-text>
            <Label hierachy="caption">{{ peripheral ? peripheral.advertisement.localName : 'no device' }}</Label>
          </v-list-item-action-text>
        </v-list-item>

        <v-list-item dense :ripple="false" :inactive="true">
          <v-list-item-content>
            <Label hierachy="paragraph">State</Label>
          </v-list-item-content>
          <v-list-item-action-text>
            <Label hierachy="caption">{{ deviceInfo.state }}</Label>
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <!-- Panel, 操作区 -->
    <div style="display: flex; flex-direction; row; padding-top: 10px; gap: 10px; max-height: 400px; height: 100%;">
      <!-- Nav menu, 显示字段 -->
      <v-list nav dense style="padding: 0;">
        <!-- Place holder -->
        <v-list-item-group color="indigo" class="lightBordered" v-if="peripheral === null">
            <v-list-item dense :inactive="true">
              <v-list-item-content style="min-width: 100px;">
              </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
        <!-- Characteristics -->
        <v-list-item-group mandatory color="indigo" v-if="peripheral" :value="characteristicSelection">
          <template v-for="(c, i) in characteristics">
            <v-list-item dense :ripple="false" :key="i">
              <v-list-item-content>
                <Label hierachy="paragraph">{{ c.name || c.uuid }}</Label>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <div style="padding: 8px; flex: auto;" class="lightBordered">
        <battery-level-data-view key="battery-level" v-if="showBatteryLevelDataView" style="height: 100%;" :buffer="receavingBuffer"></battery-level-data-view>
        <string-data-view key="manufacturer-name-string" v-if="showManufacturerNameDataView" style="height: 100%;" :buffer="receavingBuffer"></string-data-view>
        <string-data-view key="model-number-string" v-if="showModelNumber" style="height: 100%;" :buffer="receavingBuffer"></string-data-view>
        <heart-rate-measurement-data-view key="heart-rate-measurement" v-if="showHeartRateMeasurementDataView" style="height: 100%;" :buffer="receavingBuffer"></heart-rate-measurement-data-view>
        <physical-activity-measurement-data-view key="physical-activity-measurement" v-if="showPhysicalActivityMeasurementDataView" style="height: 100%;" :buffer="receavingBuffer"></physical-activity-measurement-data-view>
        <temperature-measurement-data-view key="temperature-measurement" v-if="showTemperatureMeasurementDataView" style="width: 100%; height: 100%;" :buffer="receavingBuffer"></temperature-measurement-data-view>
      </div>
    </div>

  </main>
</template>

<script>
  import Label from '../sections/Label'
  import KeyboardResponder from '../modules/KeyboardResponder'
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  import ScrollingTextDataView from '../sections/ScrollingTextDataView'
  import DotDotDotLoader from '../sections/DotDotDotLoader'
  import BatteryLevelDataView from './MindFlakeViews/BatteryLevelDataView'
  import StringDataView from './MindFlakeViews/StringDataView'
  import HeartRateMeasurementDataView from './MindFlakeViews/HeartRateMeasurementDataView'
  import PhysicalActivityMeasurementDataView from './MindFlakeViews/PhysicalActivityMeasurementDataView'
  import TemperatureMeasurementDataView from './MindFlakeViews/TemperatureMeasurementDataView'

  export default {
    name: 'mind-flake-page-reconstruct',
    components: {
      Label,
      ScrollingTextDataView,
      DotDotDotLoader,
      BatteryLevelDataView,
      StringDataView,
      HeartRateMeasurementDataView,
      PhysicalActivityMeasurementDataView,
      TemperatureMeasurementDataView
    },
    extends: KeyboardResponder,
    mixins: [ActionBarDelegate],
    data () {
      return {
        uiMounted: false,
        deviceInfo: {
          state: '未连接' // ['未连接', '已连接', '连接中', '扫描中']
        },
        scanDialogData: {
          deviceList: [],
          selection: -1
        },
        noble: null,
        peripheral: null,
        characteristics: null,
        characteristicSelection: -1,
        receavingBuffer: []
      }
    },
    watch: {
      'characteristicSelection' (newVal, oldVal) {
        if (this.characteristics === null) { return }
        // unsubscribe to the old characteristic if
        // it supports notification
        if (oldVal !== -1) {
          // clear the receaving buffer
          this.receavingBuffer = []
          // if old one supports notification, unsubscribe it
          this.characteristics[oldVal].off('data', this.dataRecieved)
          if (this.characteristics[oldVal].properties.includes('notify')) {
            // remove data recieving event listener
            this.characteristics[oldVal].unsubscribe((error) => {
              if (!error) { console.log('unsubscribed from', this.characteristics[oldVal].name) }
            })
          }
        }
        if (newVal !== -1) {
          if (this.characteristics[newVal].properties.includes('notify')) {
            // if the new one supports notification, subscribe to it
            this.characteristics[newVal].on('data', this.dataRecieved)
            // listen to changes
            this.characteristics[newVal].subscribe((error) => {
              if (!error) { console.log('subscribe to', this.characteristics[newVal].name) }
            })
            // read once
            this.characteristics[newVal].read()
          } else if (this.characteristics[newVal].properties.includes('read')) {
            // if the new one supports only read
            this.characteristics[newVal].on('data', this.dataRecieved)
            // read once
            this.characteristics[newVal].read()
          }
        }
      }
    },
    computed: {
      showToast: function () {
        const s = this.uiMounted && ['未连接', '连接中'].includes(this.deviceInfo.state)
        return s
      },
      showScanMenu: function () {
        const s = this.uiMounted && this.deviceInfo.state === '扫描中'
        if (!s) {
          this.scanDialogData.deviceList = []
          this.scanDialogData.selection = -1
        }
        return s
      },
      showBatteryLevelDataView: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.name === 'Battery Level'
      },
      showManufacturerNameDataView: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.name === 'Manufacturer Name String'
      },
      showModelNumber: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.name === 'Model Number String'
      },
      showHeartRateMeasurementDataView: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.name === 'Heart Rate Measurement'
      },
      showPhysicalActivityMeasurementDataView: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.uuid === '2b3b'
      },
      showTemperatureMeasurementDataView: function () {
        if (this.characteristics === null) { return false }
        const c = this.characteristics[this.characteristicSelection]
        return c.name === 'Temperature Measurement'
      }
    },
    methods: {
      dataRecieved (buffer, isNotification) {
        // this.receavingBuffer.push(buffer)
        this.receavingBuffer = buffer
      },
      beforeRouteLeaving () {
        // this is not the native api, it is mannually called
        // when <escape> key is pressed and certain conditions
        // are met
        this.uiMounted = false
      },
      initNoble (callback = null) {
        this.noble = require('@abandonware/noble')
        this.noble.on('stateChange', (state) => {
          if (state === 'poweredOn' && callback != null) { callback() }
        })
        // push device into device list when found
        this.noble.on('discover', async (peripheral) => {
          this.scanDialogData.deviceList.push(peripheral)
        })
        // open scan dialog
        this.noble.on('scanStart', () => {
          this.deviceInfo.state = '扫描中'
        })
      },
      startScanBLE () {
        // make sure noble has powered up
        if (this.noble === null) {
          this.initNoble(() => {
            this.startScanBLE()
          })
        } else {
          this.noble.startScanningAsync([
            '180d' // heart rate measurement service
          ], false)
        }
      },
      startConnectBLE () {
        this.peripheral = this.scanDialogData.deviceList[this.scanDialogData.selection]
        this.peripheral.once('connect', this.BLEConnected)
        this.peripheral.once('disconnect', this.BLEDisconnected)

        this.peripheral.connect()
        this.deviceInfo.state = '连接中'
      },
      BLEConnected () {
        this.deviceInfo.state = '已连接'
        // Fetch characteristics
        this.peripheral.discoverAllServicesAndCharacteristics((_, services, characteristics) => {
          this.characteristics = characteristics
          // select the first characteristic as default
          // change it only after characteristics are found
          // otherwise watcher will raise error
          this.characteristicSelection = 0
        })
      },
      BLEDisconnected () {
        this.deviceInfo.state = '未连接'
        this.peripheral = null
        this.characteristics = null
      },
      keyup (key, event) {
        switch (key) {
          case '<escape>':
            if (this.deviceInfo.state === '扫描中') {
              this.deviceInfo.state = '未连接'
              break
            }
            if (this.deviceInfo.state === '未连接') {
              this.beforeRouteLeaving()
              this.$nextTick().then(() => {
                this.$router.go(-1)
              })
              break
            }
            if (this.deviceInfo.state === '已连接') {
              this.peripheral.disconnect()
              break
            }
            break
          case 'Y':
            if (this.deviceInfo.state === '未连接') {
              this.startScanBLE()
            }
            break
          case '<up>':
            if (this.deviceInfo.state === '扫描中') {
              const l = this.scanDialogData.deviceList.length
              if (l > 0) {
                this.scanDialogData.selection -= 1
                while (this.scanDialogData.selection < 0) { this.scanDialogData.selection += l }
                this.scanDialogData.selection %= l
              }
              break
            }
            if (this.deviceInfo.state === '已连接') {
              const l = this.characteristics.length
              if (l > 0) {
                this.characteristicSelection -= 1
                while (this.characteristicSelection < 0) { this.characteristicSelection += l }
                this.characteristicSelection %= l
              }
              break
            }
            break
          case '<down>':
            if (this.deviceInfo.state === '扫描中') {
              const l = this.scanDialogData.deviceList.length
              if (l > 0) {
                this.scanDialogData.selection += 1
                while (this.scanDialogData.selection < 0) { this.scanDialogData.selection += l }
                this.scanDialogData.selection %= l
              }
              break
            }
            if (this.deviceInfo.state === '已连接') {
              const l = this.characteristics.length
              if (l > 0) {
                this.characteristicSelection += 1
                while (this.characteristicSelection < 0) { this.characteristicSelection += l }
                this.characteristicSelection %= l
              }
              break
            }
            break
          case '<enter>':
            if (this.deviceInfo.state === '扫描中') {
              if (this.scanDialogData.selection > -1 && this.scanDialogData.selection < this.scanDialogData.deviceList.length) {
                this.startConnectBLE()
              }
            }
            break
          default:
            break
        }
      }
    },
    mounted () {
      this.uiMounted = true
    },
    unmounted () {
    }
  }
</script>

<style scope>
  body .v-dialog {
    box-shadow: none;
    border: solid 1px black;
    display: flex;
    align-items: center;
    text-align: center;
    min-height: 44px;
  }
  .lightBordered {
    border-radius: 5px; 
    border-width: 1px; 
    border-style: solid; 
    border-color: rgba(0, 0, 0, 0.05);
  }
</style>