import {getCity, getTemperature, getBackgroundImage} from './Api'
import {createLoader, removeLoader, createPopup} from '../../Utils/Utils';
// eslint-disable-next-line import/no-cycle
import createMap from '../Map/Map';
import renderWeatherData from '../Render/Render'


export default function getWeatherFromApi(city, lang, units) {
    createLoader();
    return getCity(city, lang, units).
    then(data => getTemperature(data)).
    then(data => getBackgroundImage(data)).
    then(data => renderWeatherData(data)).
    then(data => createMap(data.lng, data.lat)).
    catch((e) => {

        createPopup(`${e.message}`);
        
    }).
    finally(() => setTimeout(() => removeLoader(), 500));
}