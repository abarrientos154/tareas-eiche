<template>
<div>
  <q-layout view="lHh Lpr lFf">
    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="Splash">
        <splash @pasar="pasar" />
      </q-tab-panel>
      <q-tab-panel class="q-pa-none" name="home">
        <div>
          <q-carousel
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="primary"
              navigation
              padding
              ref="carousel"
              height="700px"
              class="bg-white fullscreen column justify-center items-center text-white rounded-borders"
              >
            <q-carousel-slide @click="panel = 'ayuda'" name="parte1" class="column no-wrap flex-center">
              <q-img class="parte1" style="height: 500px; width: 300px">
              </q-img>
              <div class="text-center text-grey-8">
                <q-btn color="primary" glossy label="Reserva tu Hora" />
              </div>
            </q-carousel-slide>
            <q-carousel-slide @click="panel = 'tarea'" name="parte2"  class="column no-wrap flex-center">
            <q-img class="parte2" style="height: 500px; width: 300px">
              </q-img>
              <div class="text-center text-grey-8">
                <q-btn color="primary" glossy label="Hacer tu Tarea" />
              </div>
              </q-carousel-slide>
                <template v-slot:control>
                <q-carousel-control
                  position="bottom-right"
                  :offset="[15, 300]"
                  class="q-gutter-xs">
                  <q-btn
                    push flat text-color="primary" icon="keyboard_arrow_right"
                    @click="ruta()"
                  />
                </q-carousel-control>
                  <q-carousel-control
                  position="bottom-left"
                  :offset="[15, 300]"
                  class="q-gutter-xs">
                  <q-btn
                    push flat text-color="primary" icon="keyboard_arrow_left"
                    @click="$refs.carousel.previous()"
                  />
                </q-carousel-control>
                </template>
          </q-carousel>
        </div>
       <!--  <q-page class="bg-primary">
          <div class="absolute-center">
            <div class="text-h6">¡Bienvenido!</div>
            <div class="text-subtitle1">Que deseas hacer?</div>
            <div class="row q-mt-sm">
            <q-btn label="Tareas" color="positive" icon="task" style="width:200px" @click="panel = 'tarea'" />
            <q-btn label="Ayudantias" color="amber" icon="help_center" style="width:200px" class="q-mt-sm" @click="panel = 'ayuda'" />
            </div>
          </div>
        </q-page> -->
      </q-tab-panel>
      <q-tab-panel name="ayuda">
        <div class="absolute">
          <q-btn flat round class="q-ma-xs" icon="keyboard_backspace" color="black" @click="panel = 'home', form = {}, $v.form.$reset(), $v.file.$reset(), courses = courses_c" />
        </div>
        <div class="column q-my-xl items-center">
          <img
            alt="Quasar logo"
            src="ayuda.png"
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
              class="q-gutter-md bg-white"
            >
              <q-input outlined v-model="form.name" label="Nombre*" :error="$v.form.name.$error" error-message="Este campo es requerido" @blur="$v.form.name.$touch()"/>
              <q-input outlined v-model="form.last_name" label="Apellido*" :error="$v.form.last_name.$error" error-message="Este campo es requerido" @blur="$v.form.last_name.$touch()"/>
              <q-input outlined v-model="form.email" type="email" label="Correo*" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()"/>
              <q-input outlined v-model="form.phone" label="Telefono" :error="$v.form.phone.$error" error-message="Este campo es requerido" @blur="$v.form.phone.$touch()"/>
              <q-input readonly outlined v-model="form.fecha" mask="date" label="Fecha" :rules="['date']" stack-label
              error-message="Este campo es requerido" :error="$v.form.fecha.$error" @blur="$v.form.fecha.$touch()"
              >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date :options="optionsFn2" :locale="myLocale" v-model="form.fecha">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close"  flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
             <q-input readonly outlined v-model="form.hora" label="Hora" :error="$v.form.hora.$error" @blur="$v.form.fecha.$touch()" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time :hour-options="hourOptionsTime1"
                    :minute-options="minuteOptionsTime1" v-model="form.hora">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
                  @click="onSubmit"
                  color="primary"
                  class="q-px-md"
                />
              </div>
            </q-form>
          </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab color="positive" icon="phone" direction="up" vertical-actions-align="right">
            <q-fab-action label="Contáctate en México" color="green-10" @click="ir(1)" icon="img:wpw.png" />
            <q-fab-action label="Contáctate en Chile" color="negative" @click="ir(2)" icon="img:wpw.png" />
          </q-fab>
        </q-page-sticky>
      </q-tab-panel>
      <q-tab-panel name="tarea">
        <div class="absolute">
          <q-btn flat round class="q-ma-xs" icon="keyboard_backspace" color="black" @click="panel = 'home', form = {}, $v.form.$reset(), $v.files.$reset(), courses = courses_c" />
        </div>
        <div class="column q-my-xl items-center">
          <img
            alt="Quasar logo"
            src="tarea.png"
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
              class="q-gutter-md bg-white"
            >
              <q-input outlined v-model="form.name" label="Nombre" :error="$v.form.name.$error" error-message="Este campo es requerido" @blur="$v.form.name.$touch()"/>
              <q-input outlined v-model="form.last_name" label="Apellido" :error="$v.form.last_name.$error" error-message="Este campo es requerido" @blur="$v.form.last_name.$touch()"/>
              <q-input outlined v-model="form.email" type="email" label="Correo" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()"/>
              <q-input outlined v-model="form.phone" label="Telefono" :error="$v.form.phone.$error" error-message="Este campo es requerido" @blur="$v.form.phone.$touch()"/>
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
                  @click="onSubmit"
                  color="primary"
                  class="q-px-md"
                />
              </div>
            </q-form>
          </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab color="positive" icon="phone" direction="up" vertical-actions-align="right">
            <q-fab-action label="Contáctate en México" color="green-10" @click="ir(1)" icon="img:wpw.png" />
            <q-fab-action label="Contáctate en Chile" color="negative" @click="ir(2)" icon="img:wpw.png" />
          </q-fab>
        </q-page-sticky>
      </q-tab-panel>
    </q-tab-panels>
  </q-layout>
</div>
</template>

<script>
import Splash from '../components/Splash.vue'
import { openURL } from 'quasar'
/* import { Notify } from 'quasar'
import { Loading } from 'quasar' */
import { required, email, requiredIf } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  name: 'MainLayout',
  components: { Splash },
  data () {
    return {
      slide: 'parte1',
      lorem: '¡Descubre diferentes lugares, playas, hoteles y principales zonas turísticas en Mejillones para planificar de manera más organizada y divertida tu viaje! Consigue ofertas exclusivas, gestiona tus reservas y revisa la opinión de otros viajeros.',
      lorem2: '¿Qué contiene la app? ',
      lorem3: 'La aplicación registra los mejores destinos turísticos en Mejillones, diferentes opciones de hospedaje, servicios de transporte y actividades de entretenimiento. Guarda tus preferencias y consúltalas cuando desees, recibe alertas especiales y halla los mejores restaurantes que otros viajeros recomiendan.',
      lorem4: '¿Qué puede hacer dentro de la app? ',
      lorem5: 'Encuentra información específica sobre cada uno de los sitios que anheles visitar, como horarios, precios, ubicación o descripciones. Deja tu comentario, o lee el de otros usuarios, para hablar de tu experiencia. ¡Todo al alcance de tu mano!',
      color: true,
      panel: 'Splash',
      courses: [
        {
          name: 'Español',
          src: 'español.png',
          active: false
        },
        {
          name: 'Fisica',
          src: 'fisica.png',
          active: false
        },
        {
          name: 'Geografia',
          src: 'geografia.png',
          active: false
        },
        {
          name: 'Informatica',
          src: 'informatica.png',
          active: false
        },
        {
          name: 'Ingles',
          src: 'ingles.png',
          active: false
        },
        {
          name: 'Matematicas',
          src: 'matematica.png',
          active: false
        },
        {
          name: 'Quimica',
          src: 'quimica.png',
          active: false
        }
      ],
      courses_c: [
        {
          name: 'Español',
          src: 'español.png',
          active: false
        },
        {
          name: 'Fisica',
          src: 'fisica.png',
          active: false
        },
        {
          name: 'Geografia',
          src: 'geografia.png',
          active: false
        },
        {
          name: 'Informatica',
          src: 'informatica.png',
          active: false
        },
        {
          name: 'Ingles',
          src: 'ingles.png',
          active: false
        },
        {
          name: 'Matematicas',
          src: 'matematica.png',
          active: false
        },
        {
          name: 'Quimica',
          src: 'quimica.png',
          active: false
        }
      ],
      options: [],
      text: '',
      model: '',
      form: {},
      files: [],
      filesMaxSize: null,
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      },
      hourOptionsTime1: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      minuteOptionsTime1: [0]
    }
  },
  validations () {
    return {
      form: {
        name: { required },
        last_name: { required },
        email: { required, email },
        description: { required },
        phone: { required },
        course: { required },
        fecha: {
          required: requiredIf(function (nestedModel) {
            return this.panel === 'ayuda'
          })
        },
        hora: {
          required: requiredIf(function (nestedModel) {
            return this.panel === 'ayuda'
          })
        }
      },
      files: { required }
    }
  },
  mounted () {
    this.getCourses()
    this.getOptions()
    // this.postMail()
  },
  methods: {
    ir (type) {
      if (type === 1) {
        openURL('https://wa.me/523329608832')
      } else {
        openURL('https://wa.me/56984018152')
      }
    },
    ruta () {
      if (this.slide === 'parte2') {
        // Sthis.estaLogueado()
        this.$refs.carousel.previous()
      } else {
        this.$refs.carousel.next()
      }
    },
    optionsFn2 (datee) {
      var dd = moment().format('YYYY/MM/DD')
      // console.log(dd, this.form.fechaInicioContrato)
      const formattedString = moment(datee).format('YYYY/MM/DD')// date.formatDate(datee, 'DD-MM-YYYY')
      // console.log(formattedString, datee)
      // console.log(formattedString > dd)
      /*   console.log(formattedString,this.form.fechaInicioContrato
       ,dd.format('YYYY-MM-DD'),
       formattedString > moment(this.form.fechaInicioContrato)) */
      return formattedString > dd
    },
    pasar () {
      this.panel = 'home'
    },
    async getCourses () {
      await this.$api.get('courses').then(res => {
        console.log(res)
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
      this.$v.form.$reset()
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
      // this.$q.loading.show()
      this.$v.$touch()
      console.log(this.$v.form.$error, !this.$v.form.$error)
      if (!this.$v.form.$error && !this.$v.files.$error) {
        this.$q.loading.show({
          message: 'Enviando tu Informacion'
        })
        this.form.panel = this.panel === 'tarea' ? 'tarea' : 'ayuda'
        var formData = new FormData()
        formData.append('files', this.files)
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
              message: 'Enviado correctamente',
              color: 'positive'
            })
            this.panel = 'home'
            this.courses = this.courses_c
            this.files = null
            this.$q.loading.hide()
            // location.reload()
            this.clear()
          }
          this.$q.loading.hide()
        }).catch(erro => {
          console.log(erro)
          this.$q.loading.hide()
        })
      }
    }
  }
}
</script>

<style lang="css">
  .estilo-activo {
    background-color: #b5bce4;
  }
  .estilo-inactivo {
    background-color: white;
  }
</style>
<style>
.clearfix {
  overflow: auto;
}
</style>
<style>
.parte1 {
  background-image: url('../../public/ayuda.png');
  background-size: 100% 100%;
}
.parte2 {
  background-image: url('../../public/tarea.png');
  background-size: 100% 100%;
}
</style>
