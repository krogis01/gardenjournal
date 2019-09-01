const readline = require('readline');
const rpn = require("request-promise-native");
const vegetableInfo = require('./vegetableInfo.json');
  
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
              "nearest_climate_station": tableValues[0].slice(4, -5),
              "last_spring_frost": tableValues[2].slice(4, -5),
              "first_fall_frost": tableValues[3].slice(4, -5),
              "growing_season": tableValues[4].slice(4, -5)
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

  const month = frostDates.last_spring_frost.slice(0,3);
  const date = frostDates.last_spring_frost.slice(-2);

  const months = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11
  };

  let springFrostDate = new Date();
  springFrostDate.setMonth(months[month]);
  springFrostDate.setDate(date);

  console.log(`Last Spring Frost: ${springFrostDate}`);
  let startIndoorsDates = [];

  Object.keys(vegetableInfo).map((vegetable) => {
    if (vegetableInfo[vegetable].indoors.days_before_frost.length > 1) {
      vegetableInfo[vegetable].indoors.days_before_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() - dateOptions;
        vegetableDate.setDate(newDate);
        startIndoorsDates.push(vegetableDate);
    
        return vegetableDate;
      });
    
      console.log(`You should start your ${vegetable} between ${startIndoorsDates[0]} and ${startIndoorsDates[1]}`);
    }
  });
  
  rl.close();
});
