exports.isUrl = param => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp('https?:\/\/', 'g')
  if (param.match(regex)) return param
  throw new Error(`${param} is not http url pattern`)
}
