/**
 * for this excercise, I copied lodash's implementation
 * Ideally i'd just install lodash for such functions
 * https://github.com/lodash/lodash/blob/master/chunk.js
 */
 export function chunk<T>(array: T[], size: number) {
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}