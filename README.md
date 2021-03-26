# graphql_tools

[![GitHub release (latest by date)][releases]][releases-page] [![][docs-badge]][docs]

Deno port of `graphql-tools` library. Code is extracted from [oak_graphql](https://deno.land/x/oak_graphql@0.6.2/graphql-tools).

## Example

```ts
import { serve } from 'https://deno.land/std/http/mod.ts'
import { makeExecutableSchema } from 'https://deno.land/graphql_tools/mod.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql/mod.ts'
import { gql } from 'https://deno.land/x/graphql_tag/mod.ts'

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

for await (const req of s) app(req)
```

[releases]: https://img.shields.io/github/v/release/deno-libs/graphql_tools?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/graphql_tools?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/graphql_tag/schema/index.ts
[releases-page]: https://github.com/deno-libs/graphql_tools/releases

## Donate

[![PayPal](https://img.shields.io/badge/PayPal-cyan?style=flat-square&logo=paypal)](https://paypal.me/v1rtl) [![ko-fi](https://img.shields.io/badge/kofi-pink?style=flat-square&logo=ko-fi)](https://ko-fi.com/v1rtl) [![Qiwi](https://img.shields.io/badge/qiwi-white?style=flat-square&logo=qiwi)](https://qiwi.com/n/V1RTL) [![Yandex Money](https://img.shields.io/badge/Yandex_Money-yellow?style=flat-square&logo=yandex)](https://money.yandex.ru/to/410014774355272)

[![Bitcoin](https://badge-crypto.vercel.app/api/badge?coin=btc&address=3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5)](https://badge-crypto.vercel.app/btc/3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5) [![Ethereum](https://badge-crypto.vercel.app/api/badge?coin=eth&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)
](https://badge-crypto.vercel.app/eth/0x9d9236DC024958D7fB73Ad9B178BD5D372D82288) [![ChainLink](https://badge-crypto.vercel.app/api/badge?coin=link&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)](https://badge-crypto.vercel.app/link/0xcd0da1c9b0DA7D2b862bbF813cB50f76F2fB4F5d)
