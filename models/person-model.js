import { query as q } from "faunadb";
import { serverClient } from "../utils/fauna-auth";

export class PersonModel {
  async getAllPeople() {
    return serverClient
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_peoples"))),
          q.Lambda(
            "ref",
            q.Let(
              {
                doc: q.Get(q.Var("ref")),
              },
              {
                _id: q.Select(["ref", "id"], q.Var("doc"), null),
                id: q.Select(["data", "id"], q.Var("doc"), null),
                name: q.Select(["data", "name"], q.Var("doc"), null),
                pid: q.Select(["data", "pid"], q.Var("doc"), null),
                tags: q.Select(["data", "tags"], q.Var("doc"), null),
                img: q.Select(["data", "img"], q.Var("doc"), null),
                title: q.Select(["data", "title"], q.Var("doc"), null),
                stpid: q.Select(["data", "stpid"], q.Var("doc"), null),
              }
            )
          )
        )
      )
      .then((res) => res.data);
  }

  async updatePerson(id, person) {
    await serverClient.query(
      q.Update(q.Ref(q.Collection('People'), id), {
        data: person
      })
    )
  }
}
