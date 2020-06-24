const puppeteer = require('puppeteer');

const { filter } = require('./validates/string')
const { checkParams } = require('./validates/params')

// const { validate, url, puppeteerConfig, save } = require('../config.json');
// const { wait } = puppeteerConfig 

const andWait = async ( page, wait )=> {
  try{
    await page.waitForNavigation({ ...wait })
  } catch( err ){
    if(err.message.indexOf('Navigation timeout') < 0) throw new Error(err.message)
  }
}

const getName = async page => {
  const elementName = await page.$(".nome");
  return elementName ? await (await elementName.getProperty('textContent')).jsonValue() : elementName;
}

const getFailed = async page => {
  const elementFailed = await page.$('#mensagem');
  const failed = elementFailed ? await (await elementFailed.getProperty('textContent')).jsonValue() : elementFailed;
  return filter(failed)('\n')
}

const getUnkwonsErrors = failed => name => async page => {
  if(!name && !failed) return await page.title() 
  return failed
}

const btnBack = async (page, wait) => {
  await page.click('#btnVoltar'); 
  await andWait(page, wait);
}

module.exports = async ({ validate, url, puppeteerConfig, save }) => {

  checkParams({ validate, url, puppeteerConfig, save })
  
  const wait = puppeteerConfig && puppeteerConfig.wait ? puppeteerConfig.wait : { "waitUntil": "domcontentloaded" }
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto( url || "https://www.situacao-cadastral.com/", { ...wait });

  const results = []
  for (const param of validate) {
    await page.type('#doc', param)
    await page.click('#consultar'); 

    await andWait(page, wait);

    const result = {};
    // Get results
    const name = await getName(page);
    const failed = await getFailed(page);  
    Object.assign(result, { name , failed })
    // Get unknow errors
    Object.assign(result, { failed: await (getUnkwonsErrors(failed)(name))(page) })

    results.push({...result})

    if(save) await page.screenshot({path: `${param}.png`});

    await btnBack(page, wait)
  }

  await browser.close();
  return results;
}

// module.exports = cpfSituation;

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url, { ...wait });

//   const results = []

//   for (const param of validate) {
//     await page.type('#doc', param)
//     await page.click('#consultar'); 

//     await andWait(page);

//     const result = {};
//     // Get results
//     const name = await getName(page);
//     const failed = await getFailed(page);  
//     Object.assign(result, { name , failed })

//     // Get unknow errors
//     Object.assign(result, { failed: await (getUnkwonsErrors(failed)(name))(page) })

//     results.push({...result})

//     if(save) await page.screenshot({path: `${param}.png`});

//     await btnBack(page)
//   }

//   console.log(results)

//   await browser.close();
// })();
