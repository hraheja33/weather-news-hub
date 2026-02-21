import "./WeatherCard.css";
const WeatherCard = ({weather}) => {
    return (
        <div className="weather-card">
            <h2>{weather.name}</h2>
            <h1>{weather.main.temp}</h1>
            <p>{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt='weather icon' 
            />
            <p>Updated at: {new Date().toLocaleTimeString([], {hour: `2-digit`, minute:`2-digit`})}</p>
        </div>
    )
}

export default WeatherCard;









