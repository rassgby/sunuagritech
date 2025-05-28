import axios from 'axios';

const API_KEY = '33fb272cfd0b01b25b2a210ffa11be6b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getFullWeather = async (city) => {
  try {
    const weatherUrl = `${BASE_URL}/weather?q=${city},Senegal&appid=${API_KEY}&units=metric`;
    const forecastUrl = `${BASE_URL}/forecast?q=${city},Senegal&appid=${API_KEY}&units=metric`;

    const weatherResponse = await axios.get(weatherUrl);
    const forecastResponse = await axios.get(forecastUrl);

    if (weatherResponse.status === 200 && forecastResponse.status === 200) {
      const weatherData = weatherResponse.data;
      const forecastData = forecastResponse.data;

      const weather = {
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        icon: weatherData.weather[0].icon,
      };

      const forecastList = forecastData.list.map(item => ({
        dateTime: item.dt_txt,
        temp: item.main.temp,
        icon: item.weather[0].icon,
      })).slice(0, 10);

      return {
        current: weather,
        forecast: forecastList,
      };
    } else {
      throw new Error('Ville non trouvée ou problème de connexion réseau.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo :', error);
    throw new Error('Impossible de récupérer les données météo. Veuillez réessayer plus tard.');
  }
};

