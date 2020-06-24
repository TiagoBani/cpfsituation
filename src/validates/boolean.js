exports.isBoolean = param => {
  if (typeof param === 'boolean') return param
  throw new Error(`Param ${param} is not boolean`)
}
