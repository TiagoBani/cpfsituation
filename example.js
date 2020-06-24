(async () => {
    const config = require('./config.json')
    const situation = require('./src/index')

    const results = await situation({ validate: config.validate });
    console.log(results)
})();