// eslint-disable-next-line import/no-cycle
import {
    getFlickrTags
} from '../../Utils/Utils';
import translates from '../../DataFiles/Translates/Translates'

export async function getCity(city, lang, units) {
    try {
    const data = {};
    data.city = city;
    data.lang = lang;
    data.units = units;
    const key = '151e20ddc7594cc5a7e6a1f1476029f4';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${data.city}&key=${key}&language=${data.lang}&pretty=1`
    const response = await fetch(url);
    if (response.status === 402) {
        throw new Error(translates.errors.apiLimit[lang])
    }
    if (response.status >= 400) {
        throw new Error(translates.errors.cagedataApi[lang])
    }
    const result = await response.json();
    
    if (result.results.length === 0) {
        throw new Error(`${translates.errors.city[lang]} ${city} ${translates.errors.notFound[lang]}!`);
    }
    data.city = result.results[0].components.city || result.results[0].components.town || result.results[0].components.village || result.results[0].components.county || result.results[0].components.state;
    data.country = result.results[0].components.country;
    if (data.city === undefined && data.country === undefined) {
            throw new Error(`${translates.errors.byCoordinates[lang]} ${city} ${translates.errors.notFound[lang]}!`);
    }
    data.lat = result.results[0].geometry.lat;
    data.lng = result.results[0].geometry.lng;
    data.timezone = result.results[0].annotations.timezone.name;
    return data;
    }
    catch(e) {
        throw new Error(e.message);
    }
}
export async function getTemperature(cityInfo) {
    const data = {
        ...cityInfo
    };
    const key = 'a9a3a62789de80865407c0452e9d1c27';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&lang=${data.lang}&exclude=minutely,hourly&units=${data.units}&appid=${key}`
    try {
    const response = await fetch(url);
    const result = await response.json();
    data.todayTemperature = {
        'feelsLike': Math.round(result.current.feels_like),
        'temp': Math.round(result.current.temp),
        'humidity': result.current.humidity,
        'wind': Math.round(result.current.wind_speed),
        'weather': result.current.weather[0].main,
        'weatherDescription': result.current.weather[0].description,
        'weatherCode': result.current.weather[0].id,
        'weatherIcon': result.current.weather[0].icon,
    }
    const nextDaysTemperature = [];
    data.nextDaysTemperature = [];
    for (let i = 1; i < 4; i += 1) {
        const dayTemperature = {};
        dayTemperature.dt = new Date(result.daily[i].dt * 1000).getDay();
        dayTemperature.temp = Math.round(result.daily[i].temp.day);
        dayTemperature.weatherIcon = result.daily[i].weather[0].icon;
        nextDaysTemperature.push(dayTemperature)
    }
    data.nextDaysTemperature = nextDaysTemperature;
    return data;
} catch(e) {
    throw new Error(`${translates.errors.weatherApi[data.lang]}`);
}
}

export async function getBackgroundImage(dataInfo = {}) {
    const randomNumber = Math.trunc(Math.random() * 30);
    const data = dataInfo;
    try {
        const key = '0574f8f660a210c0fee21b2d1d88c9c8'
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${getFlickrTags(data.lat,data.timezone)}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
        const response = await fetch(url);
        const result = await response.json();
        data.imgSrc = result.photos.photo[randomNumber].url_h;
        data.imgSrc = data.imgSrc === 'undefined' ? 'https://images.unsplash.com/photo-1508179070693-6f044d6d1c43?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzQzOX0%22' : data.imgSrc;
        return data;
    } catch (e) {
        data.imgSrc = 'https://images.unsplash.com/photo-1508179070693-6f044d6d1c43?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzQzOX0%22';
        return data;
    }
}