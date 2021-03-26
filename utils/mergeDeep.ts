function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function mergeDeep(target: any, ...sources: any): any {
  const output = {
    ...target
  }
  sources.forEach((source: any) => {
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] })
          } else {
            output[key] = mergeDeep(target[key], source[key])
          }
        } else {
          Object.assign(output, { [key]: source[key] })
        }
      })
    }
  })
  return output
}
