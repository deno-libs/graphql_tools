# graphql_tools

[![GitHub release (latest by date)][releases]][releases-page] [![][docs-badge]][docs]

**DEPRECATED!** Use `https://esm.sh/@graphql-tools/schema` instead.

## Example

```ts
import { serve } from 'https://deno.land/std@0.167.0/http/server.ts'
import { makeExecutableSchema } from 'https://esm.sh/@graphql-tools/schema'
import { GraphQLHTTP } from 'https://deno.land/x/gql@1.2.0/mod.ts'
import { gql } from 'https://deno.land/x/graphql_tag@0.1.0/mod.ts'

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
