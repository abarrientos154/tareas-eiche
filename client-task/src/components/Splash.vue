<template>
    <div>
      <div class="window-height ">
        <div class="fullscreen column justify-center items-center">
          <div class="row absolute-center" style="width: 100%">
              <img src="~assets/logo_hacemos_tus_tareas_nueva_posicion.png" style="width:100%">
          </div>
          <div class="row absolute-bottom justify-center">
              <div class="text-black text-subtitle2">Un proyecto desarrollado por</div>
              <div class="text-black q-ml-sm text-bold text-subtitle2" @click="ruta()">EICHE.</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      timer: ''
    }
  },
  name: 'Splash',
  methods: {
    ruta () {
      location.href = 'https://www.eichechile.com'
    },
    test () {
      this.$emit('pasar')
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  created () {
    console.log('corriendo2')
    this.timer = setInterval(this.test, 5000)
  },
  cancelAutoUpdate () { clearInterval(this.timer) }
}
</script>

<style>

</style>
