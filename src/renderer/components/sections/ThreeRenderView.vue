<template>
  <div ref='canvas' style="border-radius: 5px; overflow: hidden; height: 100;">
  </div>
</template>

<script>
  import KeyboardResponder from '../modules/KeyboardResponder'
  import ActionBarDelegate from '../modules/ActionBarDelegate'
  import Label from './Label'
  
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

  export default {
    name: 'three-render-view',
    props: ['filePath', 'rotation', 'position'],
    components: {Label},
    mixins: [KeyboardResponder, ActionBarDelegate],
    watch: {
      'rotation.x': function (newVal, oldVal) {
        if (this.glb) {
          this.glb.scene.rotation.x = newVal
        }
      },
      'rotation.y': function (newVal, oldVal) {
        if (this.glb) {
          this.glb.scene.rotation.y = newVal
        }
      },
      'rotation.z': function (newVal, oldVal) {
        if (this.glb) {
          this.glb.scene.rotation.z = newVal
        }
      }
    },
    data () {
      const height = 300
      const width = 400
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      const light = new THREE.AmbientLight(0xffffff, 1)
      const loader = new GLTFLoader()
      return {
        width: width,
        height: height,
        scene: scene,
        camera: camera,
        renderer: renderer,
        light: light,
        loader: loader,
        canvas: null,
        glb: null
      }
    },
    created () {
      console.log('RenderTestPage', 'Setting up three environment')
      this.scene.add(this.camera)
      this.scene.add(this.light)
      this.renderer.setClearColor(0x000000, 0.1)
      this.light.position.set(0, 0, 0)
      this.camera.position.set(-270, 100, 100)
      this.camera.rotation.set(THREE.Math.degToRad(-40), THREE.Math.degToRad(-45), THREE.Math.degToRad(-30))

      this.loader.load('/static/Pulse Reader Outlined.glb', (glb) => {
        this.scene.add(glb.scene)
        glb.scene.position = new THREE.Vector3(-100, 30, 8)
        glb.scene.rotation.x = this.rotation.x
        glb.scene.rotation.y = this.rotation.y
        glb.scene.rotation.z = this.rotation.z
        this.glb = glb
      }, undefined, (error) => {
        console.log(error)
      })
    },
    methods: {
      render () {
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
      },
      updateCanvas () {
        this.width = this.$refs.canvas.clientWidth
        this.height = this.$refs.canvas.clientHeight
        // update render region
        this.renderer.setSize(this.width, this.height, false)
        this.canvas.width = this.width
        this.canvas.height = this.height
        // update camera aspect
        this.camera.aspect = this.width / this.height
        // make the changes effective
        this.camera.updateProjectionMatrix()
      },
      keyup (key, event) {
        console.log('RenderTest', 'keyup', key)
        switch (key) {
          case '<escape>':
            this.$router.go(-1)
            break
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.updateCanvas)
      this.canvas = this.renderer.domElement
      this.updateCanvas()
      this.$refs.canvas.appendChild(this.renderer.domElement)
      this.render()
    },
    unmounted () {
      window.removeEventListener('resize', this.updateCanvas)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/typologies.scss";
</style>
