exports.filter = param1 => param2 => {
  if (typeof (param1) === 'string') {
    const replacer = new RegExp(param2, 'g')
    return param1.replace(replacer, '')
  }
  return param1
}
