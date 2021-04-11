import { query as q } from "faunadb";
import { serverClient } from "../utils/fauna-auth";

export class PersonModel {
  async getAllPeople() {
    return serverClient
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_peoples"))),
          q.Lambda(
            "X", q.Get(q.Var("X"))
          )
        )
      )
      .then(res => res.data.map(p => p.data))
      .catch((err) => console.error('Error: %s', err))
  }

  async updatePerson(id, person) {
    await serverClient.query(
      q.Replace(q.Ref(q.Collection('People'), id), {
        data: person
      })
    )
    .then(res => res)
    .catch((err) => console.error('Error: %s', err))
  }

  async addPerson(person) {
    return await serverClient.query(
      q.Create(
        q.Collection('People'),
        { data: person }
      )
    )
    .then(res => res)
    .catch((err) => console.error('Error: %s', err))
  }

  async removePerson(id) {
    await serverClient.query(
      q.Delete(q.Ref(q.Collection('People'), id))
    )
    .then((ret) => console.log('ret', ret))
    .catch((err) => console.error('Error: %s', err, id))
  }
}
