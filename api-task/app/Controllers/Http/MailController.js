'use strict'
// const Mail = use("App/Models/Mail")
const { validate } = use("Validator")
const Mail = use('Mail')
const Helpers = use('Helpers')
const path = require('path')
/* const mkdirp = use('mkdirp')
const fs = require('fs') */

/* const formMailV = {
  name: "required|string",
  email: "required|string",
  category: "required|string",
  descripción: "required|string"
} */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mail
 */
class MailController {
  /**
   * Show a list of all mail.
   * GET mail
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    console.log('funcionando');
    let prueba = true
    response.send(prueba)
  }

  /**
   * Render a form to be used for creating a new mail.
   * GET mail/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new mail.
   * POST mail
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    /* const validation = await validate(request.all(), formMailV)
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } */
    let data = request.only(['data'])
    let files = request.file('files')

    /* if (files) {
      await files.move(Helpers.appRoot('resources/views/emails'), {
        name: 'prueba',
        overwrite: true
      })
    } */
    //let files = request.all()
    // let files = request.file('files')
    //console.log('val', files, 'val');
    data = JSON.parse(data.data)
    try {
      var filePath = `${path.resolve(`./tmp/uploads/`)}/${files.clientName}`
      await files.move(Helpers.tmpPath('uploads'), { name: files.clientName, overwrite: true })
    } catch (err) {
      console.log(err, 'archivo')
    }
    console.log('probando');
    try {
      await Mail.raw('emails.welcome', (message) => {
      message
        .to(`pablo.arrocet@eichechile.com` /* pablo.arrocet@eichechile.com */)
        .from(`${data.email}`)
        .subject(`Nueva ${data.panel == 'tarea' ? 'Tarea' : 'Ayudantia'} del usuario ${data.name} ${data.last_name}.`)
        .text(`Nueva ${data.panel == 'tarea' ? 'Tarea' : 'Ayudantia'} del usuario ${data.name} ${data.last_name}. De la Asignatura: ${data.course} ${data.panel == 'tarea' ? '' : 'Para la fecha: ' + data.fecha + ' a las ' + data.hora + ' Horas. ' } ${data.description}`)
        .attach(filePath)
      })
    } catch (err) {
      console.log('error1:'+err)
    }
    
    //response.send(true)
    return files
  }

  /**
   * Display a single mail.
   * GET mail/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing mail.
   * GET mail/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update mail details.
   * PUT or PATCH mail/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a mail with id.
   * DELETE mail/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MailController
