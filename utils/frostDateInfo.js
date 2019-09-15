import store from './store';
import { findLastSpringFrostDate } from '../utils/springPlantingInfo';

const getFrostDates = () => {
    let frostDates;
    const zip = store.getGlobalState().searchValue;
    const frostDatesUrl = `https://www.almanac.com/gardening/frostdates/zipcode/${zip}`;

    fetch(frostDatesUrl).then(response => response.text()).then(data => {
        const table = data.match(`<table>(.*)<\/table>`)[0];
        const tableValues = JSON.stringify(table).match(/<td>([A-Za-z ,0-9']+)<\/td>/g);
        
        if (tableValues && tableValues[4]) {
            frostDates = {
                "nearest_climate_station": tableValues[0].slice(4, -5),
                "last_spring_frost": tableValues[2].slice(4, -5),
                "first_fall_frost": tableValues[3].slice(4, -5),
                "growing_season": tableValues[4].slice(4, -5)
            }
    
            store.updateGlobalState({frostDates}, frostDates);
    
            findLastSpringFrostDate();
        }
    });

    return frostDates;
}

export {
    getFrostDates
}