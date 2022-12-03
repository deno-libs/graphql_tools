# graphql_tools

[![GitHub release (latest by date)][releases]][releases-page] [![][docs-badge]][docs]

> Deno port of [graphql-tools](https://github.com/ardatan/graphql-tools/blob/master/packages/graphql-tools) library.

Useful tools to create and manipulate GraphQL schemas. Code is extracted from [oak_graphql](https://deno.land/x/oak_graphql@0.6.2/graphql-tools).

## Example

```ts
import { serve } from 'https://deno.land/std@0.167.0/http/server.ts'
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools/mod.ts'
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
```

[releases]: https://img.shields.io/github/v/release/deno-libs/graphql_tools?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/graphql_tools?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/graphql_tools/mod.ts
[releases-page]: https://github.com/deno-libs/graphql_tools/releases
