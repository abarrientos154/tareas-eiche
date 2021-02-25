'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Course = use("App/Models/Course")
const courseData = [
  {
    name: 'Analisis y Diseño de Sistemas II',
    icon: 'manage_search'
  },
  {
    name: 'Estadística Probabilística',
    icon: 'analytics'
  },
  {
    name: 'Lenguaje de Programación III',
    icon: 'code'
  },
  {
    name: 'Modelo de Datos',
    icon: 'table_chart'
  },
  {
    name: 'Sistemas Operativos',
    icon: 'settings_suggest'
  },
  {
    name: 'Teleprocesos',
    icon: 'account_tree'
  },
  {
    name: 'Tópicos de la Informática II',
    icon: 'computer'
  },
]
class CourseSeeder {
  async run () {
    // await Course.query().delete()
    for (let i in courseData) {
      let course = await Course.findBy('name', courseData[i].name)
      if (!course) {
        await Course.create(courseData[i])
      } else {
        course.name = courseData[i].name
        course.icon = courseData[i].icon
        await course.save()
      }
    }
    console.log('Finished Course')
  }
}

module.exports = CourseSeeder
