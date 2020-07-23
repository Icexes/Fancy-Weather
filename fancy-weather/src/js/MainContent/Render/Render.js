import translates from '../../DataFiles/Translates/Translates';
import {
    getDegAndMinutes,
    setObjToLocalState,
    setTime,
    checkTimeZone
} from '../../Utils/Utils';

export default function renderWeatherData(data) {
    setObjToLocalState(data);
    const lang = localStorage.getItem('lang');
    const city = document.querySelector('.weather-information__location');
    const currDayTemperature = document.querySelector('.current-day__temperature');
    const currDayDescription = document.querySelector('.current-day__description')
    const feelsLikeTemperature = document.querySelector('.current-day__feels-like');
    const wind = document.querySelector('.current-day__wind');
    const humidity = document.querySelector('.current-day__humidity');
    const icon = document.querySelector('.current-day__icon');
    const nextDays = document.querySelectorAll('.day');
    const lat = document.querySelector('.location-information__latitude');
    const lng = document.querySelector('.location-information__longitude');
    const img = new Image();
    checkTimeZone(data.timezone);
    img.onload = () => {
        document.body.style = `background-image:url(${img.src})`
        clearInterval(window.timerId);
        window.timerId = setInterval(() => {
            setTime(data.lang, data.timezone);
        }, 1000)
    }
    img.src = data.imgSrc;
    city.textContent = `${data.city}, ${data.country}`;
    currDayDescription.textContent = `${data.todayTemperature.weatherDescription} `;
    currDayTemperature.textContent = `${data.todayTemperature.temp} `;
    feelsLikeTemperature.textContent = `${translates.feel[lang]}: ${data.todayTemperature.feelsLike}°`
    wind.textContent = `${translates.wind[lang]}: ${data.todayTemperature.wind} ${translates.ms[lang]}`
    humidity.textContent = `${translates.humidity[lang]}: ${data.todayTemperature.humidity}%`;
    lat.textContent = `${translates.lat[lang]}: ${getDegAndMinutes(data.lat)}`;
    lng.textContent = `${translates.lng[lang]}: ${getDegAndMinutes(data.lng)}`;
    icon.style = `background-image : url('/../img/${data.todayTemperature.weatherIcon}.svg')`;
    nextDays.forEach((day, idx) => {
        const thisDay = day;
        thisDay.querySelector('.day__week-day').textContent = `${translates.days[lang][data.nextDaysTemperature[idx].dt]}`
        thisDay.querySelector('.day__temperature').textContent = `${data.nextDaysTemperature[idx].temp}°`;
        thisDay.querySelector('.day__icon').style = `background-image : url('/../img/${data.nextDaysTemperature[idx].weatherIcon}.svg')`;

    })
    return data;
}