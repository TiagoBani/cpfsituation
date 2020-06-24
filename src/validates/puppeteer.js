const { isValid } = require('./length')

exports.isPuppeteerValid = ({ waitUntil }) => {
  if (waitUntil && isValid(waitUntil)) return waitUntil
  throw new Error('Config puppeteer is invalid, param.wait.waitUntil is required')
}
