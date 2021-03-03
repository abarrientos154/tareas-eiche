<template>
<div>
  <q-layout view="lHh Lpr lFf">
    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="Splash">
        <splash @pasar="pasar" />
      </q-tab-panel>

      <q-tab-panel name="Index">
        <div class="column q-my-xl items-center">
          <img
            alt="Quasar logo"
            src="~assets/logo_hacemos_tus_tareas_nueva_posicion.png"
            style="width: 100%"
          >
          <div :class="color ? 'text-center text-weight-bold q-my-md text-h6' : 'text-center text-weight-bold q-my-md text-h6 text-red'" >Selecciona la asignatura</div>
          <q-scroll-area
            horizontal
            :visible="false"
            style="height: 110px; width: 100%"
          >
            <div class="row no-wrap">
              <div class="q-mr-md" v-for="(course, index) of courses" :key="index">
                <q-img
                  :src="course.src"
                  style="width: 100px"
                  @click="activar(index)"
                  :class="course.active? 'estilo-activo': 'estilo-inactivo'"
                />
              </div>
            </div>
          </q-scroll-area>
        </div>

        <div class="column" style="width: 100%">
            <q-form
              @submit="onSubmit"
              class="q-gutter-md bg-white"
            >
              <q-input outlined v-model="form.name" label="Nombre" :error="$v.form.name.$error" error-message="Este campo es requerido" @blur="$v.form.name.$touch()"/>
              <q-input outlined v-model="form.last_name" label="Apellido" :error="$v.form.last_name.$error" error-message="Este campo es requerido" @blur="$v.form.last_name.$touch()"/>
              <q-input outlined v-model="form.email" type="email" label="Correo" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()"/>
              <div>
                <q-file
                  v-model="files"
                  :error="$v.files.$error"
                  error-message="Este campo es requerido"
                  @blur="$v.files.$touch()"
                  label="Adjuntar"
                  outlined
                />
              </div>
              <q-input
                v-model="form.description"
                :error="$v.form.description.$error"
                error-message="Este campo es requerido"
                @blur="$v.form.description.$touch()"
                outlined
                type="textarea"
                label="Descripción"
                style="height:200px"
              />
              <div class="row justify-center q-my-md">
                <q-btn
                  label="Enviar"
                  type="submit"
                  color="primary"
                  class="q-px-md"
                />
              </div>
            </q-form>
          </div>

      </q-tab-panel>
    </q-tab-panels>
  </q-layout>
</div>
</template>

<script>
import Splash from '../components/Splash.vue'
/* import { Notify } from 'quasar'
import { Loading } from 'quasar' */
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'MainLayout',
  components: { Splash },
  data () {
    return {
      color: true,
      panel: 'Splash',
      courses: [],
      slide: 'manage_search',
      options: [],
      text: '',
      model: '',
      form: {},
      files: [],
      filesMaxSize: null
    }
  },
  validations () {
    return {
      form: {
        name: { required },
        last_name: { required },
        email: { required, email },
        description: { required },
        course: { required }
      },
      files: { required }
    }
  },
  mounted () {
    this.getCourses()
    this.getOptions()
    this.postMail()
  },
  methods: {
    pasar () {
      this.panel = 'Index'
    },
    async getCourses () {
      await this.$api.get('courses').then(res => {
        this.courses = res.data
      })
    },
    getOptions () {
      for (var i in this.courses) {
        this.options[i].label = this.courses[i].icon
        this.options[i].value = this.courses[i].icon
      }
    },
    postMail () {
      this.$api.get('mail').then(res => {
        console.log(res)
      })
    },
    clear () {
      this.form = {}
    },
    activar (ind) {
      console.log(ind)
      const actual = this.courses.findIndex(v => v.active === true)
      console.log(actual)
      if (actual !== -1) {
        this.courses[actual].active = false
      }
      this.courses[ind].active = true
      this.form.course = this.courses[ind].name
    },
    onSubmit () {
      this.$q.loading.show()
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.files.$error) {
        var formData = new FormData()
        formData.append('files', this.files[0])
        formData.append('data', JSON.stringify(this.form))
        console.log(formData, this.files)
        this.$api.post('send', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res)
          if (res) {
            this.$q.notify({
              message: 'Mensaje enviado correctamente',
              color: 'positive'
            })
            this.$q.loading.hide()
            // location.reload()
            this.clear()
          }
          this.$q.loading.hide()
        })
      }
    }
  }
}
</script>

<style lang="css">
  .estilo-activo {
    background-color: #f0f0f0;
  }
  .estilo-inactivo {
    background-color: white;
  }
</style>
