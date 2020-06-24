## cpfsituation
Validation cpf situation

# commands production
```bash
npm run start 
```
```bash
npm start 
```

# commands development
```bash
npm run dev
```

# config params
```bash
{
    "url": "https://www.situacao-cadastral.com/",
    "validate": [
        "66533482882",
        "81556767145",
        "53127731159"
    ],
    "puppeteerConfig":{
        "wait": { "waitUntil": "domcontentloaded" }
    },
    "save": true
}
```

# example to use
```bash
(async () => {
    const config = {
        "url": "https://www.situacao-cadastral.com/",
        "validate": [
            "66533482882",
        ],
        "puppeteerConfig":{
            "wait": { "waitUntil": "domcontentloaded" }
        },
        "save": true
    }

    const situation = require('cpfsituation')
    const results = await situation({ validate: config.validate });
    console.log(results)
})();
```