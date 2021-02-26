<template>
<q-page class="column q-mx-lg" >
  <div>
    <q-input outlined v-model="form.name" label="Nombre" />
    <q-input outlined v-model="form.email" label="Correo" />
    <q-select outlined :options="options" v-model="form.category" label="Categoria" />
    <q-input
        v-model="form.description"
        filled
        autogrow
        label="Descripción"
      />
    <q-input
          @input="val => { files = val }"
          multiple
          filled
          type="file"
          hint="Native file (multiple)"
        />
    <q-btn push color="primary" label="Enviar" @click="send(form)" />
  </div>
</q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      model: '',
      options: ['a', 'b', 'c', 'd', 'e'],
      form: {
        name: '',
        email: '',
        category: '',
        description: '',
        attach: ''
      }
    }
  },
  validations () {
    return {
      form: {
        name: { required },
        email: { required },
        category: { required },
        description: { required }
      }
    }
  },
  mounted () {
    this.postMail()
  },
  methods: {
    postMail () {
      this.$api.get('mail').then(res => {
        console.log(res)
      })
    },
    send (message) {
      this.$api.post('send', message).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
