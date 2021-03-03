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
  },
]
class CourseSeeder {
  async run () {
    //await Course.query().delete()
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
