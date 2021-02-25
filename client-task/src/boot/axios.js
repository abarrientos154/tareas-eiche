import Vue from 'vue'
import axios from 'axios'
import env from '../env'
// import { Notify } from 'quasar'

const axiosInstance = axios.create({
  baseURL: env.apiUrl
})

Vue.prototype.$api = axiosInstance

/* export default async ({ store, Vue }) => {
  Vue.prototype.$api = axiosInstance

  axiosInstance.interceptors.response.use(function (response) {
    if (response.config.method === 'post') {
      if (response.status === 201) {
        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Correo Enviado a Destino!'
        })
      }
    }
    return response.data
  }, function (error) {
    console.log('debug', error.response)
    if (error.response === undefined) { // Si no hubo comunicación con el servidor
      console.log('no hay conexion con el servidor', error)
      Notify.create({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'No se pudo establecer conexión con el servidor. Revisa tu conexión a internet. ' + error
      })
    }
  })
} */

export { axiosInstance }
