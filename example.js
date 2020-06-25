const { cpfsituation } = require('./index')

const config = {
  validate: [
    '66533482882',
    '815.567.671-45',
    '01.424.104/0001-96',
    '86687884000110'
  ]
};

(async () => {
  const results = await cpfsituation({ validate: config.validate, save: true })
  console.log(results)
})()
