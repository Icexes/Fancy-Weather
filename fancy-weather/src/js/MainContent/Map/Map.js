import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-cycle
import getWeatherFromApi from '../Api/WeatherFromApi';



// eslint-disable-next-line consistent-return
export default function createMap(lat, lng) {
    const isMapCreated = document.querySelector('.map div') !== null;
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWNleGVzIiwiYSI6ImNrYW1iNDlwaDEydTczMHRkYnJsY2U3a2MifQ.VkFKH0-5_-LguZCvPhBqWA';

    if (isMapCreated) {
        window.mapElement.flyTo({
            center: [lat,lng],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            window.MapMarker.remove();
            // eslint-disable-next-line no-unused-vars
            window.MapMarker = new mapboxgl.Marker()
            .setLngLat([lat, lng])
            .addTo(window.mapElement);
    }
    else {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lat, lng],
        zoom: 8
    });
    window.mapElement = map;

    // eslint-disable-next-line no-unused-vars
    window.MapMarker = new mapboxgl.Marker()
        .setLngLat([lat, lng])
        .addTo(map);
    
    map.on('click', (e) => {
        getWeatherFromApi(`${e.lngLat.lat}%2C${e.lngLat.lng}`, localStorage.getItem('lang'), localStorage.getItem('units'));
    });

    return map;
}
}