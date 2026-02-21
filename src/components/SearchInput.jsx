import { useState } from "react";
import "./SearchInput.css";

const SearchInput = ({FetchWeather}) => {
    const [name, setName] = useState("");
    
    const handleChange = e => {
        setName(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name.trim()){
            FetchWeather(name);
            setName('');
        }
    }
    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form" method="post">
                <input type="text" className="search-input"  autoFocus autoComplete="off" placeholder="Search for the city..." value={name} onChange={handleChange} id="city" />
                <button type="submit" className="search-button"  onClick={() => FetchWeather}>Search 🔍</button>
            </form>
        </div>
    )
}

export default SearchInput;