import { defaultFieldResolver } from '../deps.ts'
import type { ILogger } from './types.ts'

/*
 * fn: The function to decorate with the logger
 * logger: an object instance of type Logger
 * hint: an optional hint to add to the error's message
 */
export function decorateWithLogger(fn: any, logger: ILogger, hint: string): any {
  const resolver = fn != null ? fn : defaultFieldResolver

  const logError = (e: Error) => {
    // TODO: clone the error properly
    const newE: any = new Error()
    newE.stack = e.stack
    /* istanbul ignore else: always get the hint from addErrorLoggingToSchema */
    if (hint) {
      newE['originalMessage'] = e.message
      newE.message = `Error in resolver ${hint}\n${e.message}`
    }
    logger.log(newE)
  }

  return (root: any, args: any, ctx: any, info: any) => {
    try {
      const result = resolver(root, args, ctx, info)
      // If the resolver returns a Promise log any Promise rejects.
      if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
        result.catch((reason: Error | string) => {
          // make sure that it's an error we're logging.
          const error = reason instanceof Error ? reason : new Error(reason)
          logError(error)

          // We don't want to leave an unhandled exception so pass on error.
          return reason
        })
      }
      return result
    } catch (e) {
      logError(e)
      // we want to pass on the error, just in case.
      throw e
    }
  }
}
