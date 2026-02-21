import { useEffect, useState } from 'react';
import {Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import './App.css';
import SearchInput from './components/SearchInput';
import NewsList from './components/NewsList';
import WeatherCard from './components/WeatherCard';

function App() {

  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();
  const [city,setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]= useState(null);
  const appid = import.meta.env.VITE_WEATHER_API_KEY;
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
  
  const [news,setNews] = useState([]);
  const newsAppId = import.meta.env.VITE_NEWS_API_KEY;

  const fetchWeather = async (city) => {
      setLoading(true);
      setError(null);
      setWeather(null);
      setNews([]);
      setCity(city);
      try{
        const response = await axios.get(`${URL}${city}&appid=${appid}&units=metric`);
        console.log(response.data);
        setWeather(response.data); 
        navigate('/');    
      }catch(error){
        console.error("Error fetching weather:", error)
        setError("City not found. Please try again!");
      }finally{
        setLoading(false)
      }
  };

  const getTempClass = () => {
    if(!weather || loading) return "theme-default";
    const temp = weather.main.temp;
    if(temp > 25 ) return "theme-hot";
    if(temp < 10) return "theme-cold";
    return "theme-pleasent";
  }

  const fetchNews = async (name) =>{
    try{
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${name}&apiKey=${newsAppId}`)
      setNews(response.data.articles);
      console.log(response.data.articles);
    }catch(error){
      console.error("News error: ", error);
    }
  };

  useEffect(() => {
    if(weather && weather.name){
    fetchNews(weather.name);
  }}, [weather]);
  
  return (
      <div className={`app-container ${getTempClass()}`}>
        {/* 1. Navigation Bar */}
        <nav className="navbar">
          <NavLink to="/" className='nav-logo'>WorldHub</NavLink>
          <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''}>Home</NavLink>
            <NavLink to="/news" className={({isActive}) => isActive ? 'active-link' : ''}>Top Stories</NavLink>
          </div>
        </nav>

        {/* 2. The Search */}
        <SearchInput 
          FetchWeather={fetchWeather}
          city={city}
        />

        {/* 3. The Switch Board */}
        <Routes>
          <Route path='/' element={
            weather ? ( <WeatherCard weather={weather}/>) : (
            <div className='welcome-hero'>
              <h2>Welcome to WorldHub!</h2>
              <p>Search a city to get started with local weather and news.</p>
            </div>
          )} 
          />

          <Route path='/news' element={
            <NewsList articles={news.slice(0,18)} />
          }/>
        </Routes>
        
        {loading && <p>Searching the skies... ☁️☁️</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
      
    </div>
  )
}

export default App
