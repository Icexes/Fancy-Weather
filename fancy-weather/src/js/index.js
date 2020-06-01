import '../css/style.css';
import createHeader from './Header/header';
import createMainContent from './MainContent/mainContent';
import { changeLocalState, getUserPosition, createLoader, createPopup } from './Utils/Utils';
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
createLoader();
wrapper.append(header, mainContent);
document.body.append(wrapper);
getUserPosition().then((data) => getWeatherFromApi(data, localStorage.getItem('lang'), localStorage.getItem('units')));

addListeners();
setTimeout(() => {
if (!localStorage.getItem('introduce')) {
    localStorage.setItem('introduce', 'alreadyShowed');
    createPopup('', true, true)
}
}, 0);
