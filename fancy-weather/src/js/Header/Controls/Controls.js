export default function createControls() {
    const controls = document.createElement('div');
    controls.classList.add('controls');
    const changeBackground = document.createElement('button');
    changeBackground.classList.add('controls__change-background');
    // changeBackground.textContent = 'Repeat';
    const language = document.createElement('select');
    const langContainer = document.createElement('div');
    langContainer.classList.add('lang');
    language.classList.add('controls__language', 'language');
    const engLang = document.createElement('option');
    engLang.classList.add('language__eng');
    engLang.value = 'en';
    if (engLang.value === localStorage.getItem('lang'))
    engLang.selected = true; 
    // eslint-disable-next-line no-debugger
    engLang.textContent = 'EN';
    const ruLang = document.createElement('option');
    ruLang.classList.add('language__ru');
    ruLang.value = 'ru';
    if (ruLang.value === localStorage.getItem('lang'))
    ruLang.selected = true; 
    ruLang.textContent = 'RU';
    const byLang = document.createElement('option');
    byLang.classList.add('language__by');
    byLang.value = 'be';
    if (byLang.value === localStorage.getItem('lang'))
    byLang.selected = true; 
    byLang.textContent = 'BE';
    language.append(engLang, ruLang, byLang);
    langContainer.append(language);
    const temperature = document.createElement('div');
    temperature.classList.add('controls__temperature')
    const farengate = document.createElement('button');
    if (localStorage.getItem('units') === 'imperial')
    farengate.classList.add('controls__temperature--active');
    farengate.classList.add('controls__farengate');
    farengate.setAttribute('units','imperial');
    farengate.textContent = '°F';
    const celsius = document.createElement('button');
    if (localStorage.getItem('units') === 'metric')
    celsius.classList.add('controls__temperature--active');
    celsius.classList.add('controls__celsius');
    celsius.textContent = '°C';
    celsius.setAttribute('units', 'metric');
    temperature.append(farengate, celsius);
    const speakerBtn = document.createElement('button');
    speakerBtn.type = 'button';
    speakerBtn.classList.add('constrols__pronunciation');
    controls.append(changeBackground, langContainer, temperature, speakerBtn);
    return controls;
    
}