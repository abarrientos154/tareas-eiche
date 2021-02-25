<template>
<q-page class="column q-mx-lg" >
  <div>
    <q-input outlined v-model="text" label="Nombre" />
    <q-input outlined v-model="text" label="Correo" />
    <q-select outlined :options="options" label="Categoria" />
    <q-input
        v-model="text"
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
    <q-btn push color="primary" label="Enviar" @click="send" />
  </div>
</q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      model: '',
      options: []
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
    send () {
      this.$api.post('send').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
