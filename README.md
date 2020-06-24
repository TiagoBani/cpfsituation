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
        "815.567.671-45",
        "01.424.104/0001-96",
        "86687884000110"
    ],
    "puppeteerConfig":{
        "wait": { "waitUntil": "domcontentloaded" }
    },
    "save": true
}
```

# example to use
```bash
npm i @tiagobani/cpfsituation
```
```bash
(async () => {
    const situation = require('@tiagobani/cpfsituation')
    const results = await situation({ validate: config.validate });
    console.log(results)
})();
```
