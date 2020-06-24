const cpf = require("@fnando/cpf/commonjs");
const cnpj = require("@fnando/cnpj/commonjs");

const isCpfCnpjValid = param => {
    if( cpf.isValid(param) || cnpj.isValid(param) ) return param
    throw `Param ${param} is not cpf of cnpj invalid`
}

const isValid = param => {
    if(param.length > -1 ) return param
    throw 'Array is empty!'
}

const isEmpty = param => {
    if(param) return param
    throw `Param ${param} is undefined`
}
const isUrl = param => {
    const regex = new RegExp("https?:\/\/","g")
    if(param.match(regex)) return param
    throw `${param} is not http url pattern`
}
const isBoolean = param => {
    if(typeof param == 'boolean') return param
    throw `Param ${param} is not boolean`   
}

const checkArrEmpty = fn => param => {
    return fn(isEmpty(param))
}

const validArr = param => {
    return checkArrEmpty(isValid)(param).map(isCpfCnpjValid)
}

const validUrl = param => {
    return param ? isUrl(param) : param
}

const validSave = param => {
    return !param ? param : isBoolean(param)
}

const checkPuppeteerValid = ({ waitUntil }) => {
    if( waitUntil && isValid( waitUntil ) ) return waitUntil
    throw `Config puppeteer is invalid, param.wait.waitUntil is required`
}

const validPuppeteer = param => {
    return param && param.wait ? checkPuppeteerValid(param.wait.waitUntil) : param
}

exports.checkParams = ({ validate, url, puppeteerConfig, save }) => {
    validArr(validate)
    validUrl(url)
    validSave(save)
    validPuppeteer(puppeteerConfig)
}