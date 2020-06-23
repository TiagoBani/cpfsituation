const puppeteer = require('puppeteer');

const param = '72707318531';

const { filter } = require('./validates/string')

const getName = async page => {
  const elementName = await page.$(".nome");
  const name = elementName ? await (await elementName.getProperty('textContent')).jsonValue() : elementName;
  return name
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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.situacao-cadastral.com/', { waitUntil: 'domcontentloaded' });

  // input cpf value
  await page.type('#doc', param)
  await page.click('#consultar'); 

  try{
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  } catch( err ){
    console.log(`Error waitForNavigation: ${err.message}`)
  }

  const result = {};

  const name = await getName(page);
  const failed = await getFailed(page);  
  Object.assign(result, { name , failed })

  // Get unknow errors
  Object.assign(result, { failed: await (getUnkwonsErrors(failed)(name))(page) })

  console.log(`object:`, result)

  await page.screenshot({path: `${param}.png`});
  await browser.close();
})();
