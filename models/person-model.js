import { query as q } from 'faunadb'
import { serverClient } from '../utils/fauna-auth'

export class PersonModel {
  async getAllPeople() {
    return serverClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_peoples"))),
        q.Lambda(
          "ref",
          q.Let(
            {
              doc: q.Get(q.Var("ref"))
            },
            {
              name: q.Select(["data", "name"], q.Var("doc"), null),
              parentId: q.Select(["data", "parentId"], q.Var("doc"), null)
            }
          )
        )
      )
    ).then(res => res.data)
  }
}