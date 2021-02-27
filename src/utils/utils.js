export const hasEmptyStrings = (array) => {
  if (!array.length) return true
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '') return true
  }
  return false
}
