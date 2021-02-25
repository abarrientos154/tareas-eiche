<template>
  <q-layout view="lHh Lpr lFf">
    <div class="column q-mt-lg q-mb-lg items-center">
      <img
        class="q-mx-lg"
        alt="Quasar logo"
        src="~assets/1.jpg"
        height="350px"
        width="350px"
      >
    <q-card dark bordered class="row q-mt-lg q-mb-lg justify-around bg-grey-3 q-mx-lg my-card">
      <div>
        <q-btn v-for="course of courses" v-bind:key="course._id" round color="secondary" :icon="course.icon" />
      </div>
    </q-card>
      <!-- <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      padding
      arrows
      height="60px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
    <q-carousel-slide name="manage_search" class="column no-wrap flex-center">
        <q-btn class="q-ml-xs" round color="secondary" :icon="course.icon" />
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="options"
      />
    </div> -->
      <img
        alt="Quasar logo"
        src="~assets/1.jpg"
        height="150px"
        width="350px"
      >
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      courses: [],
      slide: 'manage_search',
      options: []
    }
  },
  mounted () {
    this.getCourses()
    this.getOptions()
  },
  methods: {
    async getCourses () {
      await this.$api.get('courses').then(res => {
        this.courses = res.data
      })
      console.log(this.courses)
    },
    getOptions () {
      for (var i in this.courses) {
        this.options[i].label = this.courses[i].icon
        this.options[i].value = this.courses[i].icon
      }
    }
  }
}
</script>
