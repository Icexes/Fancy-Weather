import translates from '../DataFiles/Translates/Translates';
// eslint-disable-next-line import/no-cycle
import {
  getCity
} from '../MainContent/Api/Api';

export const getNumberFromRow = (row) => row.replace(/\D+/g, "");

export function convertTemperatureToF(row) {
  return Math.round((getNumberFromRow(row) * 9) / 5 + 32);
}

export function getDegAndMinutes(deg) {
  const int = Math.trunc(deg);
  const minutes = Math.floor((deg - int) * 60);
  return `${int}°${Math.abs(minutes)}'`
}

export function convertTemperatureToC(row) {
  return Math.round(((getNumberFromRow(row) - 32) * 5) / 9);
}

export function changeTemperature(units) {
  const currentWeather = document.querySelector('.current-day__temperature');
  const nextDaysTemperature = document.querySelectorAll('.day__temperature');
  const feelsLike = document.querySelector('.current-day__feels-like');
  currentWeather.textContent = units === 'metric' ? convertTemperatureToC(currentWeather.textContent) :
    convertTemperatureToF(currentWeather.textContent);
  feelsLike.textContent = units === 'metric' ? `${feelsLike.textContent.split(':')[0]}: ${convertTemperatureToC(feelsLike.textContent)}°` :
    `${feelsLike.textContent.split(':')[0]}: ${convertTemperatureToF(feelsLike.textContent)}°`
  nextDaysTemperature.forEach((temperature) => {
    const dayTemp = temperature;
    dayTemp.textContent = units === 'metric' ? `${convertTemperatureToC(dayTemp.textContent)}°` :
      `${convertTemperatureToF(dayTemp.textContent)}°`;
  })
}

export function checkTimeZone(timezone) {
  try {
    const date = new Date().toLocaleDateString('en', {timeZone : timezone});
    return date;
  }
  catch(e) {
    throw new Error(e.message);
  }
}


export function setTime(lang = 'en', timezone) {
  let date = new Date().toLocaleString(lang, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone,
    hour12: false
  })
    const byDate = new Date(Date.parse(new Date().toLocaleString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone
    })));
    const month = translates.months[lang][byDate.getMonth()];
    const day = translates.shortDays[lang][byDate.getDay()];
    const dateNumber = byDate.getDate();
    const time = date.split(',').pop();
    date = `${day} ${dateNumber} ${month}, ${time}`
  document.querySelector('.weather-information__date-time').textContent = date;
}

export async function getUserPosition() {
  return new Promise((resolve) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    async function success(pos) {
      resolve(`${pos.coords.latitude},${pos.coords.longitude}`);
    };

    function error() {

      resolve('51.508530,-0.076132');
    };

    // eslint-disable-next-line no-unused-expressions
    navigator.geolocation.getCurrentPosition(success, error, options);
  })

}

export const changeLocalState = (key, value) => localStorage.setItem(key, value);

export const setObjToLocalState = (obj) => {
  const str = JSON.stringify(obj);
  localStorage.setItem('weatherData', str);
}

export const getObjFromLocalState = (str) => {
  return JSON.parse(str);
}

export function translatePage(lang) {
  const weatherData = getObjFromLocalState(localStorage.getItem('weatherData'));
  const searchBtn = document.querySelector('.search-form__sumbit-btn');
  const inputRow = document.querySelector('.search-form__search-input');
  const currentDayDescription = document.querySelector('.current-day__description');;
  const feelsLike = document.querySelector('.current-day__feels-like');
  const wind = document.querySelector('.current-day__wind');
  const humidity = document.querySelector('.current-day__humidity');
  const lat = document.querySelector('.location-information__latitude');
  const lng = document.querySelector('.location-information__longitude');
  const nextDays = document.querySelectorAll('.day__week-day');
  const city = document.querySelector('.weather-information__location');
  getCity(`${weatherData.lat}%2C${weatherData.lng}`, lang).then(data => {
    city.textContent = `${data.city}, ${data.country}`
  })
  inputRow.placeholder = translates.placeholder[lang];
  searchBtn.textContent = translates.search[lang];
  currentDayDescription.textContent = translates.weather[lang][weatherData.todayTemperature.weatherCode];
  feelsLike.textContent = `${translates.feel[lang]}: ${getNumberFromRow(feelsLike.textContent)}°`;
  wind.textContent = `${translates.wind[lang]}: ${getNumberFromRow(wind.textContent)} ${translates.ms[lang]}`;
  humidity.textContent = `${translates.humidity[lang]}: ${getNumberFromRow(humidity.textContent)}%`;
  lat.textContent = `${translates.lat[lang]}: ${lat.textContent.split(':')[1]}`;
  lng.textContent = `${translates.lng[lang]}: ${lng.textContent.split(':')[1]}`;
  nextDays.forEach((day, idx) => {
    const thisDay = day;
    thisDay.textContent = translates.days[lang][weatherData.nextDaysTemperature[idx].dt];
  })
  clearInterval(window.timerId);

  window.timerId = setInterval(() => {
    setTime(lang, weatherData.timezone)
  }, 1000)
}

export function getFlickrTags(lat, timezone) {
  let season;
  const month = new Date().getMonth();
  switch (month) {
    case 11:
    case 0:
    case 1:
      season = 'winter';
      if (lat < 0) season = 'summer';
      break;
    case 2:
    case 3:
    case 4:
      season = 'spring';
      if (lat < 0) season = 'autumn';
      break;
    case 5:
    case 6:
    case 7:
      season = 'summer';
      if (lat < 0) season = 'winter';
      break;
    default:
      season = 'autumn';
      if (lat < 0) season = 'spring';
  }
  const dateStr = new Date().toLocaleString('en', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone,
    hour12: false
  })
  const hours = new Date(dateStr).getHours();
  let time;
  if (hours >= 4 && hours <= 11)
    time = 'morning';
  else if (hours > 11 && hours <= 16)
    time = 'afternoon';

  else if (hours > 16 && hours < 23)
    time = 'evening';
  else time = 'night';
  console.log(`${time},${season},nature`);
  return `${time},${season},nature`;
}

export function createMessage() {
  let units = document.querySelector('.controls__temperature--active').textContent;
  if (localStorage.lang !== 'en')
    units = units.replace(/C/gi, 'С');
  const location = document.querySelector('.weather-information__location').textContent;
  const temperature = document.querySelector('.current-day__temperature').textContent;
  const description = document.querySelector('.current-day__description').textContent;
  const feelsLike = document.querySelector('.current-day__feels-like').textContent;

  let wind = document.querySelector('.current-day__wind').textContent;
  wind = wind.replace(/м\/с/gi, 'метров в секунду');
  wind = wind.replace(/m\/s/gi, 'metres per second');
  const humidity = document.querySelector('.current-day__humidity').textContent;
  const msg = `${location}, ${temperature}${units}, ${description}, ${feelsLike}${units.charAt(1)}, ${wind}, ${humidity}`

  return msg;
}



export function createLoader() {
  if (document.querySelector('.spinner') === null) {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    const spinnerElement = document.createElement('div');
    spinnerElement.classList.add('spinner__element');
    spinner.append(spinnerElement);
    document.body.append(spinner);
  }
}
export function removeLoader() {
  const spinner = document.querySelector('.spinner');
  spinner.parentNode.removeChild(spinner);
}

export function createPopup(msg, isNotification = false, isIntroduce = false) {
  const popup = document.createElement('div');
  
  const popupMessage = document.createElement('div');
  popupMessage.classList.add('popup__message');
  popupMessage.textContent = msg;
  if (isNotification) {
    popup.classList.add('popup--green');
  }
  if (isIntroduce) {
    popup.classList.add('popoup__intro');
    const btn = document.createElement('button');
    btn.type = 'button';
    popup.append(btn);
    btn.classList.add('popup__close-btn');
    btn.onclick = () => popup.parentNode.removeChild(popup);
    setTimeout(() => popup.parentNode.removeChild(popup), 35000);
    popupMessage.innerHTML = translates.notification;
  }
  else {
    popup.classList.add('popup');
    setTimeout(() => popup.parentNode.removeChild(popup), 5000);
  }
  popup.append(popupMessage);
  document.body.append(popup);
}




export class ApiError extends Error {
  constructor(message, fromPromise) {
      super(message);
      this.fromApi = fromPromise;
  }
}