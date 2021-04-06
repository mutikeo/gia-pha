import { createHandlers } from '../../utils/rest-utils'
import { PersonModel } from '../../models/person-model'

const handlers = {
  GET: async(req, res) => {
    const model = new PersonModel();
    const people = await model.getAllPeople()
    res.status(200).json({ people })
  }
}

export default function people(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
} 