exports.isEmpty = param => {
  if (param) return param
  throw new Error(`Param ${param} is undefined`)
}
