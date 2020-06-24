const puppeteer = require('puppeteer');

const { filter } = require('./validates/string')

const { validate, url, puppeteerConfig, save } = require('../config.json');
const { wait } = puppeteerConfig 

const andWait = async page => {
  try{
    await page.waitForNavigation({ ...wait })
  } catch( err ){
    if(err.message.indexOf('Navigation timeout') > -1){
      return console.log(`Error waitForNavigation: ${err.message}`)
    } 
    throw new Error(err.message)
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

const btnBack = async page => {
  await page.click('#btnVoltar'); 
  await andWait(page);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { ...wait });

  const results = []

  for (const param of validate) {
    await page.type('#doc', param)
    await page.click('#consultar'); 

    await andWait(page);

    const result = {};
    // Get results
    const name = await getName(page);
    const failed = await getFailed(page);  
    Object.assign(result, { name , failed })

    // Get unknow errors
    Object.assign(result, { failed: await (getUnkwonsErrors(failed)(name))(page) })

    results.push({...result})

    if(save) await page.screenshot({path: `${param}.png`});

    await btnBack(page)
  }

  console.log(results)

  await browser.close();
})();
