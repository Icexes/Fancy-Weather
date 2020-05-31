// import translates from '../DataFiles/Translates/Translates';

export default function createMainContent() {
    const main = document.createElement('main');
   // const lang = localStorage.getItem('lang');
    main.classList.add('main');
    const mainTemplate = `
    <div class = 'main__wrapper'>
        <div class = 'weather-information'>
            <p class = 'weather-information__location'></p>
            <p class = 'weather-information__date-time'>
                <span class='weather-information__date'></span>
                <span class='weather-information__time'></span>
            </p>
        <div class = 'current-day'>
            <div class = 'current-day__temperature'></div>
            <div class = 'current-day__about-weather'>
                <div class = 'current-day__icon'></div>
                <div class = 'current-day__description'></div>
                <div class = 'current-day__feels-like'></div>
                <div class = 'current-day__wind'></div>
                <div class = 'current-day__humidity'></div>
            </div>
        </div>
        <div class = 'next-days'>
        <div class = 'day'>
        <div class = 'day__week-day'></div>
        <div class = 'day__about-weather'>
        <div class = 'day__temperature'></div>
        <div class = 'day__icon'></div>
        </div>
        </div>
        <div class = 'day'>
        <div class = 'day__week-day'></div>
        <div class = 'day__about-weather'>
        <div class = 'day__temperature'></div>
        <div class = 'day__icon'></div>
        </div>
        </div>
        <div class = 'day'>
        <div class = 'day__week-day'></div>
        <div class = 'day__about-weather'>
        <div class = 'day__temperature'></div>
        <div class = 'day__icon'></div>
        </div>
        </div>
        </div>
        </div>
        <div class = 'location-information'>
        <div class = 'map' id = 'map'></div>
        <p class = location-information__latitude></p>
        <p class = location-information__longitude></p>
        </div>
    </div>
    `
    main.innerHTML = mainTemplate;
    return main;
}