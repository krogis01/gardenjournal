import store from './store';

const findLastSpringFrostDate = () => {
    let springFrostDate;
    const frostDates = store.getGlobalState().frostDates;

    if (frostDates !== '') {
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
    }

    store.updateGlobalState({springFrostDate}, JSON.stringify(springFrostDate));

    findVegetableStartDates(springFrostDate);
}

const addDays = (date, days) => {
  let newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

const getAllDatesBetween = (firstDate, lastDate) => {
  let dateArray = [];
  let currentDate = firstDate;

  while (currentDate <= lastDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dateArray;
}

const findVegetableStartDates = (springFrostDate) => {
  vegetableInfo = store.getGlobalState().vegetableInfo;

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
      });

      const allDates = getAllDatesBetween(startVegetableDates.startIndoorsDates[vegetable][0], startVegetableDates.startIndoorsDates[vegetable][1]);
      startVegetableDates.startIndoorsDates[vegetable] = allDates;
    }

    if (vegetableInfo[vegetable].outdoors.transplant_seedling_days_after_frost.length > 1) {
      startVegetableDates.transplantOutdoorsDates[vegetable] = [];

      vegetableInfo[vegetable].outdoors.transplant_seedling_days_after_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() + dateOptions;
        vegetableDate.setDate(newDate);
        startVegetableDates.transplantOutdoorsDates[vegetable].push(vegetableDate);
      });

      const allDates = getAllDatesBetween(startVegetableDates.transplantOutdoorsDates[vegetable][0], startVegetableDates.transplantOutdoorsDates[vegetable][1]);
      startVegetableDates.transplantOutdoorsDates[vegetable] = allDates;
    }

    if (vegetableInfo[vegetable].outdoors.days_after_frost.length > 1) {
      startVegetableDates.startOutdoorsDates[vegetable] = [];

      vegetableInfo[vegetable].outdoors.days_after_frost.map((dateOptions) => {
        const vegetableDate = new Date(springFrostDate);
        const newDate = vegetableDate.getDate() + dateOptions;
        vegetableDate.setDate(newDate);
        startVegetableDates.startOutdoorsDates[vegetable].push(vegetableDate);
      });    
      
      const allDates = getAllDatesBetween(startVegetableDates.startOutdoorsDates[vegetable][0], startVegetableDates.startOutdoorsDates[vegetable][1]);
      startVegetableDates.startOutdoorsDates[vegetable] = allDates;
    }
  });

  store.updateGlobalState({startVegetableDates}, JSON.stringify(startVegetableDates));
}

export {
    findLastSpringFrostDate
}