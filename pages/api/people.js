import { createHandlers } from '../../utils/rest-utils'
import { PersonModel } from '../../models/person-model'

const handlers = {
  GET: async(req, res) => {
    const model = new PersonModel()
    const people = await model.getAllPeople()
    res.status(200).json(people)
  },
  /** Update a person's info 
   * @address `/api/people?id=${id}`
   * @param {string} id - person's id
   * @body {Object} - person's data
   */
  PUT: async(req, res) => {
    const model = new PersonModel()
    const person = req.body
    await model.updatePerson(req.query.id, person)
    res.status(200).json({ done: true })
  }
}

export default function people(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}