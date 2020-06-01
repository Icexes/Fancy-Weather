import {changeTemperature, changeLocalState, translatePage, createMessage, getObjFromLocalState, createLoader, removeLoader, createPopup} from '../Utils/Utils'
import getWeatherFromApi from '../MainContent/Api/WeatherFromApi'
import {getBackgroundImage} from '../MainContent/Api/Api'
import createSpeechRecognition from '../MainContent/Speech/SpeechRecognition'
import translates from '../DataFiles/Translates/Translates'

export default function addListeners() {
    const header = document.querySelector('.header');
    const farengates = document.querySelector('.controls__farengate');
    const celsius = document.querySelector('.controls__celsius');
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('.search-form__sumbit-btn');
    const searchField = document.querySelector('.search-form__search-input');
    const mic = document.querySelector('.mic');
    const languages = document.querySelector('.controls__language');
    const changeBackground = document.querySelector('.controls__change-background');
    const recognition = createSpeechRecognition(localStorage.getItem('lang'));
    const playSpeechBtn = document.querySelector('.constrols__pronunciation');
    const synth  = window.speechSynthesis || window.mozspeechSynthesis || window.webkitspeechSynthesis;
    const message =  new SpeechSynthesisUtterance();
    message.onend = () =>  playSpeechBtn.classList.remove('constrols__pronunciation--active');
    message.volume = 1;
    // eslint-disable-next-line consistent-return
    header.addEventListener('click', (event) => {

        if (event.target === farengates) {
            if (!farengates.classList.contains('controls__temperature--active')) {
                celsius.classList.remove('controls__temperature--active');
                farengates.classList.add('controls__temperature--active');
                changeLocalState('units', 'imperial');
                changeTemperature('imperial')
            }
        }
        else if (event.target === celsius) {
            if (!celsius.classList.contains('controls__temperature--active')) {
                farengates.classList.remove('controls__temperature--active');
                celsius.classList.add('controls__temperature--active');
                changeLocalState('units', 'metric');
                changeTemperature('metric');
            }
        }
        else if (event.target === searchBtn) {
            event.preventDefault();
            const query = searchField.value;
            if (query.length < 2) return 0;
            getWeatherFromApi(query, localStorage.getItem('lang'), localStorage.getItem('units'))
        }
        else if (event.target === changeBackground) {
            createLoader();
            getBackgroundImage(getObjFromLocalState(localStorage.getItem('weatherData'))).
            then(data => {
                const img = new Image();
                img.onload = () => {
                    document.body.style = `background: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${img.src}) center center no-repeat fixed; background-size: cover;`
                }
                img.src = data.imgSrc;
            }).
            finally(() => removeLoader());

        }
        else if (event.target.closest('.search-form__voice-btn')) {
            mic.classList.add('mic--active')
            event.preventDefault();
            recognition.start();
        }
        else if (event.target === playSpeechBtn) {
            if (playSpeechBtn.classList.contains('constrols__pronunciation--active')) {
                playSpeechBtn.classList.remove('constrols__pronunciation--active');
                synth.cancel();
            }
            else {
            message.text = createMessage();
            playSpeechBtn.classList.add('constrols__pronunciation--active');
            message.lang = localStorage.getItem('lang')
            message.rate = 1.8; ;
            synth.speak(message);
        }
        }
    });

    languages.addEventListener('change', (event) => {
        recognition.lang = event.target.value;
        changeLocalState('lang', event.target.value);
        translatePage(localStorage.getItem('lang'));
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const click = new Event('click', {
            "bubbles": true,
            "cancelable": false
        });
        searchBtn.dispatchEvent(click);
    })

    recognition.addEventListener('result', (event) => {
        recognition.stop();
        mic.classList.remove('mic--active');
        const click = new Event('click', {
            "bubbles": true,
            "cancelable": false
        });
        let result = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
            result += event.results[i][0].transcript;
        }
        if (result === translates.voiceSpeech.weather[localStorage.getItem('lang')]) {            
            playSpeechBtn.dispatchEvent(click);
        }
        else if (result === translates.voiceSpeech.louder[localStorage.getItem('lang')]) {
            message.volume += 0.1;
           createPopup(`${translates.volume[localStorage.getItem('lang')]} ${Math.round((message.volume)*100)}%`,true);
        }

        else if (result === translates.voiceSpeech.quieter[localStorage.getItem('lang')]) {
            message.volume -= 0.1;
            createPopup(`${translates.volume[localStorage.getItem('lang')]} ${Math.round((message.volume)*100)}%`, true);
        }
        else {
        searchField.value = result;
        searchBtn.dispatchEvent(click);
        }
    })
    
    recognition.addEventListener('error', (event) => {
        mic.classList.remove('mic--active')
        createPopup( `Error occurred in recognition: ${event.error}`);
    });
}