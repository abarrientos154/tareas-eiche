<template>
<q-page>
  <div class="animation-wrapper">
        <div class="inner-animation-wrapper">
          <div class="column q-mx-lg">
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
                label="Adjuntar"
                filled
                style="max-width: 300px"
              />
              <q-btn
                label="Enviar"
                type="submit"
                color="primary"
                class="right q-pa-sm q-mt-sm"
              />
            </q-form>
          </div>
        </div>
    </div>
  <div>

    <!-- <q-btn push color="primary" label="Enviar" @click="onSubmit" /> -->
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
      formData.append('files', this.files[0])
      formData.append('data', JSON.stringify(this.form))
      console.log(formData, this.files)
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
<style lang="css">
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
