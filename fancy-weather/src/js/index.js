import '../css/style.css';
import createHeader from './Header/header';
import createMainContent from './MainContent/mainContent';
import {changeLocalState, getUserPosition, createLoader} from './Utils/Utils';

// import { getCity, getTemperature } from './MainContent/Api/Api'
// import renderWeatherData from './MainContent/Render/Render'
// import createMap from './MainContent/Map/Map'
import addListeners from './Listeners/Listeners'
import getWeatherFromApi from './MainContent/Api/WeatherFromApi';


if (!localStorage.getItem('lang')) {
    changeLocalState('lang', 'en');
}
if (!localStorage.getItem('units')) {
    changeLocalState('units', 'metric');
}
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const header = createHeader();
const mainContent = createMainContent();

wrapper.append(header, mainContent);
document.body.append(wrapper);
// const a =  getPosition().then(data => console.log(data,'data'));
// console.log(a);
// getCity('Минск', 'be', true).
//     then(data => getTemperature(data)).
//     then(data => renderWeatherData(data)).
//     then(data => createMap(data.lng, data.lat));

// const lang = localStorage.getItem('lang');
// const units = localStorage.getItem('units');


createLoader();
// eslint-disable-next-line no-debugger
debugger;
getUserPosition().then((data) => getWeatherFromApi(data, localStorage.getItem('lang'), localStorage.getItem('units')));

addListeners();

