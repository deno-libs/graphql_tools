# graphql_tools

Deno port of `graphql-tools` library. Code is extracted from [oak_graphql](https://deno.land/x/oak_graphql@0.6.2/graphql-tools).

## Example

```ts
import { serve } from 'https://deno.land/std/http/mod.ts'
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools/mod.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql/mod.ts'
import { gql } from 'https://deno.land/x/graphql-tag/mod.ts'

const typeDefs = gql`
type Query {
  hello: String
}
`

const resolvers = {
  Query: {
    hello: () => return `Hello World!`
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = GraphQLHTTP({ schema })

const s = serve({ port: 3000 })

for await (const req of s) {
  app(req)
}
```
