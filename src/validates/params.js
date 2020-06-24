const { isCpfCnpjValid } = require('./cpfCnpj')
const { isUrl } = require('./url')
const { isBoolean } = require('./boolean')
const { isEmpty } = require('./empty')
const { isValid } = require('./length')
const { isPuppeteerValid } = require('./puppeteer')

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

const validPuppeteer = param => {
  return param && param.wait ? isPuppeteerValid(param.wait.waitUntil) : param
}

exports.checkParams = ({ validate, url, puppeteerConfig, save }) => {
  validArr(validate)
  validUrl(url)
  validSave(save)
  validPuppeteer(puppeteerConfig)
}
