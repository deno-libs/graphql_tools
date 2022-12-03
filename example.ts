import { serve } from 'https://deno.land/std@0.167.0/http/server.ts'
import { makeExecutableSchema } from './mod.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql@1.1.2/mod.ts'
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

await serve(GraphQLHTTP({ schema, graphiql: true }), { port: 3000 })
