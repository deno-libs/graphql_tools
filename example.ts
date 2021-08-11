import { serve } from 'https://deno.land/std@0.104.0/http/server.ts'
import { makeExecutableSchema } from './mod.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql@0.2.0/mod.ts'
import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello World!`
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = GraphQLHTTP({ schema, graphiql: true })

const s = serve({ port: 3000 })

for await (const req of s) {
  app(req)
}
