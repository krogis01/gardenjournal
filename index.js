const readline = require('readline');
var rpn = require("request-promise-native");
  
const getHardinessZone = async(zip) => {
  let zone;
  const zoneUrl = `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zip}`;
  
  await rpn(zoneUrl, (error, response, body) => {
    if (response.statusCode === 200) {
        zone = JSON.parse(body).zone;
    } else {
        console.log(error);
        console.log('Invalid zip code. Please try again.');
    }
  });

  return zone;
}

const getFrostDates = async(zip) => {
    let frostDateInfo;
    const frostDatesUrl = `https://www.almanac.com/gardening/frostdates/zipcode/${zip}`;
  
    await rpn(frostDatesUrl, (error, response, body) => {
      if (response.statusCode === 200) {
          const table = body.match(`<table>(.*)<\/table>`)[0];
          const tableValues = JSON.stringify(table).match(/<td>([A-Za-z ,0-9']+)<\/td>/g);
          frostDateInfo = {
              "Nearest Climate Station": tableValues[0].slice(4, -5),
              "Last Spring Frost": tableValues[2].slice(4, -5),
              "First Fall Frost": tableValues[3].slice(4, -5),
              "Growing Season": tableValues[4].slice(4, -5)
          }
      } else {
          console.log(error);
          console.log('Invalid zip code. Please try again.');
      }
    });
  
    return frostDateInfo;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
  
rl.question('What is your zip code?', async(answer) => {
  const zone = await getHardinessZone(answer);
  console.log(`You are in zone: ${zone}`);

  const frostDates = await getFrostDates(answer);
  console.log(`Your frost information is: ${JSON.stringify(frostDates)}`);
  
  rl.close();
});
