const translates = {
    "placeholder": {
        be: "Увядзіце горад...",
        ru: "Введите город...",
        en: "Enter city..."
    },
    "search": {
        be: "пошук",
        ru: "поиск",
        en: "search"
    },
    "feel": {
        be: "Адчуваецца як",
        ru: "Ощущается как",
        en: "Feels like",
    },
    "wind": {
        be: "Вецер",
        ru: "Ветер",
        en: "Wind"
    },
    "ms": {
        be: "м/с",
        ru: "м/с",
        en: "m/s"
    },
    "humidity": {
        be: "Вільготнасць",
        ru: "Влажность",
        en: "Humidity"
    },
    "days": {
        be: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацверг", "Пятнiца", "Субота"],
        ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    "months": {
        be: [
            "Студзеня",
            "Лютага",
            "Сакавіка",
            "Красавіка",
            "Мая",
            "Чэрвеня",
            "Ліпеня",
            "Аўгуста",
            "Верасеня",
            "Кастрычніка",
            "Лістапада",
            "Снежаня"
        ],
        ru: [
            "Января",
            "Февраля",
            "Марта",
            "Апреля",
            "Мая",
            "Июня",
            "Июля",
            "Августа",
            "Сентября",
            "Октября",
            "Ноября",
            "Декабря"
        ],
        en: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
    },
    "lat": {
        be: "Шырата",
        ru: "Широта",
        en: "Latitude"
    },
    "lng": {
        be: "Даўгата",
        ru: "Долгота",
        en: "Longitude"
    },
    "weather": {
        be: {
            "200": "Навальніца з невялікім дажджом",
            "201": "Навальніца з дажджом",
            "202": "Навальніца з праліўным дажджам",
            "231": "Навальніца з маросячым даждем",
            "232": "Навальніца з сільным маросячым дождем",
            "233": "Навальніца з градом",
            "300": "Легкая марось",
            "301": "Марось",
            "302": "Сильный дождж",
            "500": "Легкі дождж",
            "501": "Умеренный дождж",
            "502": "Сильный дождж",
            "511": "Дождж со снегом",
            "520": "Слабый дождж",
            "521": "Лівень",
            "522": "Сильный ливень",
            "600": "Легкі снег",
            "601": "Снег",
            "602": "Сільны снегапад",
            "610": "Смешаны снег / дождж",
            "611": "Мокрый снег",
            "612": "Цяжкі мокры снег",
            "621": "Снегапад",
            "622": "Сільны снегапад",
            "623": "Снегапад",
            "700": "Імгла",
            "711": "Дым",
            "721": "Туман",
            "731": "Песок / пыль",
            "741": "Туман",
            "751": "Морозный туман",
            "800": "Бясхмарна",
            "801": "Слабая воблачнасць",
            "802": "Пераменная воблачнасць",
            "803": "Пагодна",
            "804": "Пахмурна",
            "900": "Невядомыя ападкі"
        },
        ru: {
            "200": "Гроза с небольшим дождем",
            "201": "Гроза с дождем",
            "202": "Гроза с проливным дождем",
            "231": "Гроза с моросящим дождем",
            "232": "Гроза с сильным моросящим дождем",
            "233": "Гроза с градом",
            "300": "Легкая морось",
            "301": "Морось",
            "302": "Сильный дождь",
            "500": "Легкий дождь",
            "501": "Умеренный дождь",
            "502": "Сильный дождь",
            "511": "Дождь со снегом",
            "520": "Слабый дождь",
            "521": "Ливень",
            "522": "Сильный ливень",
            "600": "Легкий снег",
            "601": "Снег",
            "602": "Сильный снегопад",
            "610": "Смешать снег / дождь",
            "611": "Мокрый снег",
            "612": "Тяжелый мокрый снег",
            "621": "Снегопад",
            "622": "Сильный снегопад",
            "623": "Снегопад",
            "700": "Мгла",
            "711": "Дым",
            "721": "Туман",
            "731": "Песок / пыль",
            "741": "Туман",
            "751": "Морозный туман",
            "800": "Безоблачно",
            "801": "Слабая облачность",
            "802": "Переменная облачность",
            "803": "Облачно с прояснениями",
            "804": "Пасмурно",
            "900": "Неизвестные осадки"
        },
        en: {
            "200": "Thunderstorm with light rain",
            "201": "Thunderstorm with rain",
            "202": "Thunderstorm with heavy rain",
            "231": "Thunderstorm with drizzle",
            "232": "Thunderstorm with heavy drizzle",
            "233": "Thunderstorm with Hail",
            "300": "Light Drizzle",
            "301": "Drizzle",
            "302": "Heavy Drizzle",
            "500": "Light Rain",
            "501": "Moderate Rain",
            "502": "Heavy Rain",
            "511": "Freezing rain",
            "520": "Light shower rain",
            "521": "Shower rain",
            "522": "Heavy shower rain",
            "600": "Light snow",
            "601": "Snow",
            "602": "Heavy Snow",
            "610": "Mix snow/rain",
            "611": "Sleet",
            "612": "Heavy sleet",
            "621": "Snow shower",
            "622": "Heavy snow shower",
            "623": "Flurries",
            "700": "Mist",
            "711": "Smoke",
            "721": "Haze",
            "731": "Sand/dust",
            "741": "Fog",
            "751": "Freezing Fog",
            "800": "Clear sky",
            "801": "Few clouds",
            "802": "Scattered clouds",
            "803": "Broken clouds",
            "804": "Overcast clouds",
            "900": "Unknown Precipitation"
        }
    },
    "errors": { 
        city : {
            be: "Населены пункт",
            ru: 'Населённый пункт',
            en: 'Location'
        },
    notFound : {
        be: "не найдзены",
        ru: "не найден",
        en: "not found",
    },
    byCoordinates : {
        be: 'Горад па каардынатам',
        ru: 'Город по координатам',
        en: 'City by coordintaes'
    },
    api : {
        be: "дасягнута максімальная колькасць спроб да АПА, паспрабуйце пазней!",
        ru: "Достигнуто максимальное количество попыток  к АПИ, попробуйте позже!",
        en: "The maximum number of attempts to API has been reached, try later!"
    }
    },
    voiceSpeech : {
        weather : {
            be: 'надвор\'е',
            ru: 'погода',
            en: 'weather'
        },
        louder : {
            be: 'гучней',
            ru: 'громче',
            en: 'louder'
        },
        quieter : {
            be: 'цішэй',
            ru: 'тише',
            en: 'quieter'
        }
    }
}

export default translates;
