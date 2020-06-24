exports.isValid = param => {
  if (param.length > -1) return param
  throw new Error('Array is empty!')
}
