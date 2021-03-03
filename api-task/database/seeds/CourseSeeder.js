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
    name: 'Español',
    src: 'español.png'
  },
  {
    name: 'Fisica',
    src: 'fisica.png'
  },
  {
    name: 'Geografia',
    src: 'geografia.png'
  },
  {
    name: 'Informatica',
    src: 'informatica.png'
  },
  {
    name: 'Ingles',
    src: 'ingles.png'
  },
  {
    name: 'Matematicas',
    src: 'matematica.png'
  },
  {
    name: 'Quimica',
    src: 'quimica.png'
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
