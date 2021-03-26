import { getNamedType, isScalarType } from '../deps.ts'

import { IResolverValidationOptions, forEachField } from '../utils/index.ts'

export function assertResolversPresent(schema: any, resolverValidationOptions: IResolverValidationOptions = {}): void {
  const {
    requireResolversForArgs = false,
    requireResolversForNonScalar = false,
    requireResolversForAllFields = false
  } = resolverValidationOptions

  if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
    throw new TypeError(
      'requireResolversForAllFields takes precedence over the more specific assertions. ' +
        'Please configure either requireResolversForAllFields or requireResolversForArgs / ' +
        'requireResolversForNonScalar, but not a combination of them.'
    )
  }

  forEachField(schema, (field: any, typeName: string, fieldName: any) => {
    // requires a resolver for *every* field.
    if (requireResolversForAllFields) {
      expectResolver(field, typeName, fieldName)
    }

    // requires a resolver on every field that has arguments
    if (requireResolversForArgs && field.args.length > 0) {
      expectResolver(field, typeName, fieldName)
    }

    // requires a resolver on every field that returns a non-scalar type
    if (requireResolversForNonScalar && !isScalarType(getNamedType(field.type))) {
      expectResolver(field, typeName, fieldName)
    }
  })
}

function expectResolver(field: any, typeName: string, fieldName: string) {
  if (!field.resolve) {
    // eslint-disable-next-line no-console
    console.warn(
      `Resolver missing for "${typeName}.${fieldName}".
To disable this warning check pass;
resolverValidationOptions: {
  requireResolversForNonScalar: false
}
      `
    )
    return
  }
  if (typeof field.resolve !== 'function') {
    throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`)
  }
}
