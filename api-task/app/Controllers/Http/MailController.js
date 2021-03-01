'use strict'
// const Mail = use("App/Models/Mail")
const { validate } = use("Validator")
const Mail = use('Mail')

const formMailV = {
  name: "required|string",
  email: "required|string",
  category: "required|string",
  descripción: "required|string"
}

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
    console.log('val', data.data, 'val');
    console.log('probando');
    await Mail.raw('emails.welcome', (message) => {
      message
        .to(`${data.email}`)
        .from('josnielfermin@gmail.com')
        .subject(`Email de ${data.name} con estatus: ${data.category}`)
        .text(`${data.description}`)
        /* .attachData(`${body.files.file[0]}` ,`${body.files.file[0].name}`) */
    })
    //response.send(true)
    return 'Registered successfully'
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
