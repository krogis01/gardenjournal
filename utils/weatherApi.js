import store from './store';

const getWeatherInfo = (locationKey) => {
    let weatherIcon;
    const weatherInfoUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=9I6NvEyuq2Ob3kK4gBH0xykAt4kYGqRo`;
    
    fetch(weatherInfoUrl).then(response => response.json()).then(data => {
        const todayDateTime = new Date();
        if (todayDateTime.getHours() > 19 || todayDateTime.getHours() < 7) {
            weatherIcon = data.DailyForecasts[0].Night.Icon;
        } else {
            weatherIcon = data.DailyForecasts[0].Day.Icon;
        }

        store.updateGlobalState({weatherIcon}, JSON.stringify(weatherIcon));
    });
}

const getWeatherData = () => {
    console.log('hey');
    const zip = store.getGlobalState().searchValue;
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?q=${zip}&apikey=9I6NvEyuq2Ob3kK4gBH0xykAt4kYGqRo`;

    fetch(url).then(response => response.json()).then(data => {
        const locationKey = data[0].Key;

        getWeatherInfo(locationKey);
    });
};

export {
    getWeatherData
}