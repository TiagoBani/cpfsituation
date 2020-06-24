(async () => {
    const config = {
        "validate": [
            "66533482882",
            "815.567.671-45",
            "01.424.104/0001-96",
            "86687884000110"
        ]
    }
    const situation = require('./src/index')
    const results = await situation({ validate: config.validate, save: true });
    console.log(results)
})();
