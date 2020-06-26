# cpfsituation

[![NPM package version](https://img.shields.io/npm/v/@tiagobani/cpfsituation.svg)](https://www.npmjs.com/package/@tiagobani/cpfsituation)
![License: MIT](https://img.shields.io/npm/l/@tiagobani/cpfsituation.svg)

This package does some
[CPF](http://en.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas) and 
[CNPJ](https://pt.wikipedia.org/wiki/Cadastro_Nacional_da_Pessoa_Jur%C3%ADdica) magic. It allows you to validate and consult holder of CPF documents or validate and consult name of CNPJ documents.

**HINT:** Not use in approach synchronous

## Installation

This lib is available as a NPM package. To install it, use the following
command:

```
npm install @tiagobani/cpfsituation --save
```

If you're using Yarn:

```
yarn add @tiagobani/cpfsituation
```

## Usage

```js
// Node.js-specific
const { cpfsituation } = require('@tiagobani/cpfsituation')

(async () => {
    const results = await cpfsituation({ validate: [ '66533482882' ] }) 
    // only return result
    console.log(results)
})();

const { cpfsituation } = require('@tiagobani/cpfsituation')

(async () => {
    const results = await cpfsituation({ validate: [ '66533482882' ], save: true }) 
    // return result and create png to each request
    console.log(results)
})();
```

## Params
| Param                  | Required      |  type            | 
| ---------------------- | ------------- |  --------------- |
| validate               | true          |  array           | 
| url                    | false         |  string          |
| save                   | false         |  boolean         |
| puppeteerConfig        | false         |  object          |
| puppeteerConfig.wait   | false         |  object          |

### params example
```js
{
    "url": "https://www.situacao-cadastral.com/",
    "validate": [
        "66533482882",
        "815.567.671-45",
        "01.424.104/0001-96",
        "86687884000110"
    ],
    "puppeteerConfig":{
        "wait": { "waitUntil": "domcontentloaded", "timeout": 5000 }
    },
    "save": true
}
```

## commands 
### production
```bash
npm run start 
```

### development
```bash
npm run dev
```
