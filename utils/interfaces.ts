import type { SchemaVisitor } from './SchemaVisitor.ts'

// graphql-js < v15 backwards compatible ExecutionResult
// See: https://github.com/graphql/graphql-js/pull/2490

export interface ExecutionResult<TData = Record<string, any>> {
  data?: TData | null
  extensions?: Record<string, any>
}

// for backwards compatibility
export type Result = ExecutionResult

// graphql-js non-exported typings

export type TypeMap = Record<string, any>

export interface GraphQLExecutionContext {
  schema: any
  fragments: Record<string, any>
  rootValue: any
  contextValue: any
  operation: any
  variableValues: Record<string, any>
  fieldResolver: any
  errors: Array<any>
}

export interface GraphQLParseOptions {
  noLocation?: boolean
  allowLegacySDLEmptyFields?: boolean
  allowLegacySDLImplementsInterfaces?: boolean
  experimentalFragmentVariables?: boolean
}

// graphql-tools typings

export interface IResolverValidationOptions {
  requireResolversForArgs?: boolean
  requireResolversForNonScalar?: boolean
  requireResolversForAllFields?: boolean
  requireResolversForResolveType?: boolean
  allowResolversNotInSchema?: boolean
}

export interface IAddResolversToSchemaOptions {
  schema: any
  resolvers: IResolvers
  defaultFieldResolver?: IFieldResolver<any, any>
  resolverValidationOptions?: IResolverValidationOptions
  inheritResolversFromInterfaces?: boolean
  updateResolversInPlace?: boolean
}

export type IScalarTypeResolver = any & {
  __name?: string
  __description?: string
  __serialize?: any
  __parseValue?: any
  __parseLiteral?: any
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: Array<any>
}

export type IEnumTypeResolver = Record<string, any> & {
  __name?: string
  __description?: string
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: Array<any>
}

export interface IFieldResolverOptions<TSource = any, TContext = any, TArgs = any> {
  name?: string
  description?: string
  type?: any
  args?: Array<any>
  resolve?: IFieldResolver<TSource, TContext, TArgs>
  subscribe?: IFieldResolver<TSource, TContext, TArgs>
  isDeprecated?: boolean
  deprecationReason?: string
  extensions?: Record<string, any>
  astNode?: any
}

export type SchemaTransform = (originalSchema: any) => any
export type RequestTransform = (originalRequest: Request) => Request
export type ResultTransform = (originalResult: ExecutionResult) => ExecutionResult

export interface Transform {
  transformSchema?: SchemaTransform
  transformRequest?: RequestTransform
  transformResult?: ResultTransform
}

export type FieldNodeMapper = (fieldNode: any, fragments: Record<string, any>) => any | Array<any>

export type FieldNodeMappers = Record<string, Record<string, FieldNodeMapper>>

export type FieldFilter = (typeName?: string, fieldName?: string, fieldConfig?: any) => boolean

export type RootFieldFilter = (
  operation?: 'Query' | 'Mutation' | 'Subscription',
  rootFieldName?: string,
  fieldConfig?: any
) => boolean

export type RenameTypesOptions = {
  renameBuiltins: boolean
  renameScalars: boolean
}

export type IFieldResolver<TSource, TContext, TArgs = Record<string, any>, TReturn = any> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: any
) => TReturn

export type ITypedef = (() => Array<ITypedef>) | string | any

export type ITypeDefinitions = ITypedef | Array<ITypedef>

export type IObjectTypeResolver<TSource = any, TContext = any, TArgs = any> = {
  [key: string]: IFieldResolver<TSource, TContext, TArgs> | IFieldResolverOptions<TSource, TContext>
} & {
  __name?: string
  __description?: string
  __isTypeOf?: any
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: any
}

export type IInterfaceTypeResolver<TSource = any, TContext = any, TArgs = any> = {
  [key: string]: IFieldResolver<TSource, TContext, TArgs> | IFieldResolverOptions<TSource, TContext>
} & {
  __name?: string
  __description?: string
  __resolveType?: any
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: Array<any>
}

export type IUnionTypeResolver = {
  __name?: string
  __description?: string
  __resolveType?: any
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: Array<any>
}

export type IInputObjectTypeResolver = {
  __name?: string
  __description?: string
  __extensions?: Record<string, any>
  __astNode?: any
  __extensionASTNodes?: Array<any>
}

export type ISchemaLevelResolver<TSource, TContext, TArgs = Record<string, any>, TReturn = any> = IFieldResolver<
  TSource,
  TContext,
  TArgs,
  TReturn
>

export type IResolvers<TSource = any, TContext = any, TArgs = Record<string, any>, TReturn = any> = Record<
  string,
  | ISchemaLevelResolver<TSource, TContext, TArgs, TReturn>
  | IObjectTypeResolver<TSource, TContext>
  | IInterfaceTypeResolver<TSource, TContext>
  | IUnionTypeResolver
  | IScalarTypeResolver
  | IEnumTypeResolver
  | IInputObjectTypeResolver
>

export type IFieldIteratorFn = (fieldDef: any, typeName: string, fieldName: string) => void

export type IDefaultValueIteratorFn = (type: any, value: any) => void

export type NextResolverFn = () => Promise<any>

export type DirectiveResolverFn<TSource = any, TContext = any> = (
  next: NextResolverFn,
  source: TSource,
  args: { [argName: string]: any },
  context: TContext,
  info: any
) => any

export interface IDirectiveResolvers<TSource = any, TContext = any> {
  [directiveName: string]: DirectiveResolverFn<TSource, TContext>
}

export type Operation = 'query' | 'mutation' | 'subscription'

export interface Request {
  document: any
  variables: Record<string, any>
  extensions?: Record<string, any>
}

export type VisitableSchemaType = any

export type VisitorSelector = (type: VisitableSchemaType, methodName: string) => Array<SchemaVisitor | SchemaVisitorMap>

export enum VisitSchemaKind {
  TYPE = 'VisitSchemaKind.TYPE',
  SCALAR_TYPE = 'VisitSchemaKind.SCALAR_TYPE',
  ENUM_TYPE = 'VisitSchemaKind.ENUM_TYPE',
  COMPOSITE_TYPE = 'VisitSchemaKind.COMPOSITE_TYPE',
  OBJECT_TYPE = 'VisitSchemaKind.OBJECT_TYPE',
  INPUT_OBJECT_TYPE = 'VisitSchemaKind.INPUT_OBJECT_TYPE',
  ABSTRACT_TYPE = 'VisitSchemaKind.ABSTRACT_TYPE',
  UNION_TYPE = 'VisitSchemaKind.UNION_TYPE',
  INTERFACE_TYPE = 'VisitSchemaKind.INTERFACE_TYPE',
  ROOT_OBJECT = 'VisitSchemaKind.ROOT_OBJECT',
  QUERY = 'VisitSchemaKind.QUERY',
  MUTATION = 'VisitSchemaKind.MUTATION',
  SUBSCRIPTION = 'VisitSchemaKind.SUBSCRIPTION'
}

export interface SchemaVisitorMap {
  [VisitSchemaKind.TYPE]?: NamedTypeVisitor
  [VisitSchemaKind.SCALAR_TYPE]?: ScalarTypeVisitor
  [VisitSchemaKind.ENUM_TYPE]?: EnumTypeVisitor
  [VisitSchemaKind.COMPOSITE_TYPE]?: CompositeTypeVisitor
  [VisitSchemaKind.OBJECT_TYPE]?: ObjectTypeVisitor
  [VisitSchemaKind.INPUT_OBJECT_TYPE]?: InputObjectTypeVisitor
  [VisitSchemaKind.ABSTRACT_TYPE]?: AbstractTypeVisitor
  [VisitSchemaKind.UNION_TYPE]?: UnionTypeVisitor
  [VisitSchemaKind.INTERFACE_TYPE]?: InterfaceTypeVisitor
  [VisitSchemaKind.ROOT_OBJECT]?: ObjectTypeVisitor
  [VisitSchemaKind.QUERY]?: ObjectTypeVisitor
  [VisitSchemaKind.MUTATION]?: ObjectTypeVisitor
  [VisitSchemaKind.SUBSCRIPTION]?: ObjectTypeVisitor
}

export type NamedTypeVisitor = (type: any, schema: any) => any | null | undefined

export type ScalarTypeVisitor = (type: any, schema: any) => any | null | undefined

export type EnumTypeVisitor = (type: any, schema: any) => any | null | undefined

export type CompositeTypeVisitor = (type: any, schema: any) => any | null | undefined

export type ObjectTypeVisitor = (type: any, schema: any) => any | null | undefined

export type InputObjectTypeVisitor = (type: any, schema: any) => any | null | undefined

export type AbstractTypeVisitor = (type: any, schema: any) => any | null | undefined

export type UnionTypeVisitor = (type: any, schema: any) => any | null | undefined

export type InterfaceTypeVisitor = (type: any, schema: any) => any | null | undefined

export enum MapperKind {
  TYPE = 'MapperKind.TYPE',
  SCALAR_TYPE = 'MapperKind.SCALAR_TYPE',
  ENUM_TYPE = 'MapperKind.ENUM_TYPE',
  COMPOSITE_TYPE = 'MapperKind.COMPOSITE_TYPE',
  OBJECT_TYPE = 'MapperKind.OBJECT_TYPE',
  INPUT_OBJECT_TYPE = 'MapperKind.INPUT_OBJECT_TYPE',
  ABSTRACT_TYPE = 'MapperKind.ABSTRACT_TYPE',
  UNION_TYPE = 'MapperKind.UNION_TYPE',
  INTERFACE_TYPE = 'MapperKind.INTERFACE_TYPE',
  ROOT_OBJECT = 'MapperKind.ROOT_OBJECT',
  QUERY = 'MapperKind.QUERY',
  MUTATION = 'MapperKind.MUTATION',
  SUBSCRIPTION = 'MapperKind.SUBSCRIPTION',
  DIRECTIVE = 'MapperKind.DIRECTIVE',
  FIELD = 'MapperKind.FIELD',
  COMPOSITE_FIELD = 'MapperKind.COMPOSITE_FIELD',
  OBJECT_FIELD = 'MapperKind.OBJECT_FIELD',
  ROOT_FIELD = 'MapperKind.ROOT_FIELD',
  QUERY_ROOT_FIELD = 'MapperKind.QUERY_ROOT_FIELD',
  MUTATION_ROOT_FIELD = 'MapperKind.MUTATION_ROOT_FIELD',
  SUBSCRIPTION_ROOT_FIELD = 'MapperKind.SUBSCRIPTION_ROOT_FIELD',
  INTERFACE_FIELD = 'MapperKind.INTERFACE_FIELD',
  INPUT_OBJECT_FIELD = 'MapperKind.INPUT_OBJECT_FIELD',
  ARGUMENT = 'MapperKind.ARGUMENT',
  ENUM_VALUE = 'MapperKind.ENUM_VALUE'
}

export interface SchemaMapper {
  [MapperKind.TYPE]?: NamedTypeMapper
  [MapperKind.SCALAR_TYPE]?: ScalarTypeMapper
  [MapperKind.ENUM_TYPE]?: EnumTypeMapper
  [MapperKind.COMPOSITE_TYPE]?: CompositeTypeMapper
  [MapperKind.OBJECT_TYPE]?: ObjectTypeMapper
  [MapperKind.INPUT_OBJECT_TYPE]?: InputObjectTypeMapper
  [MapperKind.ABSTRACT_TYPE]?: AbstractTypeMapper
  [MapperKind.UNION_TYPE]?: UnionTypeMapper
  [MapperKind.INTERFACE_TYPE]?: InterfaceTypeMapper
  [MapperKind.ROOT_OBJECT]?: ObjectTypeMapper
  [MapperKind.QUERY]?: ObjectTypeMapper
  [MapperKind.MUTATION]?: ObjectTypeMapper
  [MapperKind.SUBSCRIPTION]?: ObjectTypeMapper
  [MapperKind.ENUM_VALUE]?: EnumValueMapper
  [MapperKind.FIELD]?: GenericFieldMapper<any>
  [MapperKind.OBJECT_FIELD]?: FieldMapper
  [MapperKind.ROOT_FIELD]?: FieldMapper
  [MapperKind.QUERY_ROOT_FIELD]?: FieldMapper
  [MapperKind.MUTATION_ROOT_FIELD]?: FieldMapper
  [MapperKind.SUBSCRIPTION_ROOT_FIELD]?: FieldMapper
  [MapperKind.INTERFACE_FIELD]?: FieldMapper
  [MapperKind.COMPOSITE_FIELD]?: FieldMapper
  [MapperKind.ARGUMENT]?: ArgumentMapper
  [MapperKind.INPUT_OBJECT_FIELD]?: InputFieldMapper
  [MapperKind.DIRECTIVE]?: DirectiveMapper
}

export type NamedTypeMapper = (type: any, schema: any) => any | null | undefined

export type ScalarTypeMapper = (type: any, schema: any) => any | null | undefined

export type EnumTypeMapper = (type: any, schema: any) => any | null | undefined

export type EnumValueMapper = (value: any, typeName: string, schema: any) => any | [string, any] | null | undefined

export type CompositeTypeMapper = (type: any, schema: any) => any | null | undefined

export type ObjectTypeMapper = (type: any, schema: any) => any | null | undefined

export type InputObjectTypeMapper = (type: any, schema: any) => any | null | undefined

export type AbstractTypeMapper = (type: any, schema: any) => any | null | undefined

export type UnionTypeMapper = (type: any, schema: any) => any | null | undefined

export type InterfaceTypeMapper = (type: any, schema: any) => any | null | undefined

export type DirectiveMapper = (directive: any, schema: any) => any | null | undefined

export type GenericFieldMapper<F extends any> = (
  fieldConfig: F,
  fieldName: string,
  typeName: string,
  schema: any
) => F | [string, F] | null | undefined

export type FieldMapper = GenericFieldMapper<any>

export type ArgumentMapper = (
  argumentConfig: any,
  fieldName: string,
  typeName: string,
  schema: any
) => any | [string, any] | null | undefined

export type InputFieldMapper = GenericFieldMapper<any>
