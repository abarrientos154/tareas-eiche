<template>
    <q-layout>
    <div class="animation-wrapper">
        <div class="inner-animation-wrapper">
        <img src="~assets/logo_hacemos_tus_tareas_nueva_posicion.png" class="logo">
        </div>
    </div>
    <div class="row absolute-bottom justify-center q-py-sm">
        <div class="row">
          <div class="text-black text-subtitle2">Un proyecto desarrollado por</div>
          <div class="text-black q-ml-sm text-bold text-subtitle2" @click="ruta()">EICHE.</div>
        </div>
    </div>
    </q-layout>
</template>
<script>
import { QLayout } from 'quasar'
export default {
  data () {
    return {
      timer: ''
    }
  },
  name: 'Splash',
  components: {
    QLayout
  },
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
    this.timer = setInterval(this.test, 4000)
  },
  cancelAutoUpdate () { clearInterval(this.timer) }
}
</script>

<style lang="css">
    .logo {
        width: 300px;
        height: 180px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
    }
    .animation-wrapper {
        height: 100vh;
        background-color: #f0f0f0;
    }
    .inner-animation-wrapper {
        width: 100%;
        height: 100vh;
        display: flex;
    }

</style>
