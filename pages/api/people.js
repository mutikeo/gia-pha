import { createHandlers } from '../../utils/rest-utils'
import { PersonModel } from '../../models/person-model'

const handlers = {
  GET: async(req, res) => {
    const model = new PersonModel()
    const people = await model.getAllPeople()
    res.status(200).json(people)
  },
  /** Update a person's info
   * 
   * @address `/api/people?id=${id}`
   * @param {string} id - person's id
   * @body {Object} - person's data
   */
  PUT: async(req, res) => {
    const model = new PersonModel()
    const person = req.body
    await model.updatePerson(req.query.id, person)
    res.status(200).json({ done: true })
  },
  /** Add a new person
   * 
   * @address `/api/people`
   * @method POST
   * @body {Object} - person's data
   */
  POST: async(req, res) => {
    const model = new PersonModel();
    const person = req.body;
    const newPerson = await model.addPerson(person);
    res.status(200).json({ ...newPerson, done: true });
  },
  /** Delete a person
   * 
   * @address `/api/people?id=${id}`
   * @method DELETE
   * @param {string} id - person's id
   */
  DELETE: async(req, res) => {
    const model = new PersonModel();
    await model.removePerson(req.query.id);
    res.status(200).json({ done: true });
  },
}

export default function people(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}