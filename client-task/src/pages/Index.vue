<template>
<q-page class="column q-mx-lg" >
  <div>
    <q-form
      @submit="onSubmit"
    >
      <q-input outlined v-model="form.name" label="Nombre" />
      <q-input outlined v-model="form.email" label="Correo" />
      <q-select outlined :options="options" v-model="form.category" label="Categoria" />
      <q-input
          v-model="form.description"
          filled
          autogrow
          label="Descripción"
        />
      <q-file
        name="filename"
        v-model="files"
        label="Pick files"
        filled
        multiple
        style="max-width: 300px"
      />
    <q-btn
            label="Guardar"
            type="submit"
            color="primary"
            class="right q-pa-sm q-mt-sm"
          />
    </q-form>
    <q-btn push color="primary" label="Enviar" @click="onSubmit" />
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
        description: ''
      },
      files: []
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
    onSubmit () {
      var formData = new FormData()
      formData.append('files', this.files)
      formData.append('data', JSON.stringify(this.form))
      console.log(formData)
      this.$api.post('send', formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
