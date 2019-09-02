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

const findLastSpringFrostDate = (frostDates) => {
  let springFrostDate;

  if (frostDates) {
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

    springFrostDate = new Date();
    springFrostDate.setMonth(months[month]);
    springFrostDate.setDate(date);
  } else {
    console.log(`Invalid frostDates info was passed in: ${frostDates}`);
  }

  return springFrostDate;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const findVegetableStartDates = (vegetableInfo, springFrostDate) => {
  let startVegetableDates = {
    startIndoorsDates: {},
    transplantOutdoorsDates: {},
    startOutdoorsDates: {}
  };

  Object.keys(vegetableInfo).map((vegetable) => {
    if (vegetableInfo[vegetable].indoors.days_before_frost.length > 1) {
      startVegetableDates.startIndoorsDates[vegetable] = [];

      vegetableInfo[vegetable].indoors.days_before_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() - dateOptions;
        vegetableDate.setDate(newDate);
        startVegetableDates.startIndoorsDates[vegetable].push(vegetableDate);
    
        return vegetableDate;
      });
    
      console.log(`You should start your ${vegetable} inside between ${startVegetableDates.startIndoorsDates[vegetable][0]} and ${startVegetableDates.startIndoorsDates[vegetable][1]}`);
    }

    if (vegetableInfo[vegetable].outdoors.transplant_seedling_days_after_frost.length > 1) {
      startVegetableDates.transplantOutdoorsDates[vegetable] = [];

      vegetableInfo[vegetable].outdoors.transplant_seedling_days_after_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() + dateOptions;
        vegetableDate.setDate(newDate);
        startVegetableDates.transplantOutdoorsDates[vegetable].push(vegetableDate);
    
        return vegetableDate;
      });
    
      console.log(`You should move your ${vegetable} outside between ${startVegetableDates.transplantOutdoorsDates[vegetable][0]} and ${startVegetableDates.transplantOutdoorsDates[vegetable][1]}`);
    }

    if (vegetableInfo[vegetable].outdoors.days_after_frost.length > 1) {
      startVegetableDates.startOutdoorsDates[vegetable] = [];

      vegetableInfo[vegetable].outdoors.days_after_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() + dateOptions;
        vegetableDate.setDate(newDate);
        startVegetableDates.startOutdoorsDates[vegetable].push(vegetableDate);
    
        return vegetableDate;
      });
    
      console.log(`You should start your ${vegetable} seeds outside between ${startVegetableDates.startOutdoorsDates[vegetable][0]} and ${startVegetableDates.startOutdoorsDates[vegetable][1]}`);
    }
  });

  return startVegetableDates;
}
  
rl.question('What is your zip code?', async(answer) => {
  const zone = await getHardinessZone(answer);
  console.log(`You are in zone: ${zone}`);

  const frostDates = await getFrostDates(answer);
  console.log(`Your frost information is: ${JSON.stringify(frostDates)}`);

  const springFrostDate = findLastSpringFrostDate(frostDates);
  console.log(`Last Spring Frost: ${springFrostDate}`);

  const startVegetableInfo = findVegetableStartDates(vegetableInfo, springFrostDate);
  console.log(JSON.stringify(startVegetableInfo));
  
  rl.close();
});
