const cpf = require('@fnando/cpf/commonjs')
const cnpj = require('@fnando/cnpj/commonjs')

exports.isCpfCnpjValid = param => {
  if (cpf.isValid(param)) return cpf.strip(param)
  if (cnpj.isValid(param)) return cnpj.strip(param)
  throw new Error(`Param ${param} is not cpf of cnpj invalid`)
}
