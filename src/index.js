import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import BarChart from './BarChart'

//weather api key
const apiKey = "6e02ed06076a93442e1e1a6c199308b6";

//hike data
const lat = 47.4966;
const lon = -121.733;
const avgTime = "6.5hr";
const distance = "8.0mi";
const difficulty = "Hard";
const elevation = "3150ft";
const terrain = "Exposed Rock";

function AppHeader(props){
  return (
    <div className="header">
      <h1>{props.name}</h1>
      <h3>{props.area}</h3>
    </div>
  );
}

function WeatherWarning(props){
  return (
    <div className="weather-warning">
      <h4>{props.title}</h4>
      <p className="warning-content">{props.content}</p>
    </div>
  )
}

class DisplayWeather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      temp: "",
      tempForecast: "",
      description: "",
      descriptionForecast: "",
      wind: "",
      sunset: "",
      icon: "",
      dayornight: ""
    }
  }

  componentDidMount() {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily}&units=imperial&appid=${apiKey}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(
        (result) => {
          var utcunixtime = result.current.sunset;
          var date = new Date(utcunixtime*1000);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          
          var sunsetTime = hours + ":"+minutes+ampm;

          this.setState({
            isLoaded: true,
            temp: Math.round(result.current.temp),
            tempForecast: Math.round(result.hourly[5].temp),
            description: result.current.weather[0].description,
            descriptionForecast: result.hourly[5].weather[0].description,
            wind: Math.round(result.current.wind_speed*10)/10,
            sunset: sunsetTime,
            icon: " http://openweathermap.org/img/wn/"+result.current.weather[0].icon+"@2x.png",
            dayornight: result.current.weather[0].icon.substr(2,1)
          });
          // console.log(result);
        }, 
        
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    const { isLoaded, error, temp, tempForecast, description, descriptionForecast, wind, sunset } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var weatherClassName = "weather-icon";
      if(this.state.dayornight === "d") weatherClassName+="-d";
      return (
        <div className="weather">
          <h5 className="section-title">Weather Conditions</h5>
          <img className={weatherClassName} src={this.state.icon} alt="weather-icon"/>
          <div>
            <h2 className="temperature">{this.state.temp}°F → {this.state.tempForecast}°F</h2>
          </div>
          <div>
            <h2 className="forecast">{this.state.description} → {this.state.descriptionForecast}</h2>
            <p className="sunsetwind">Wind: {this.state.wind}mph | Sunset: {this.state.sunset}</p>
          </div>
          <WeatherWarning title="Parts of this trail are covered by snow" content="Wear microspikes or high-traction footwear"/>
        </div>
      );
    }
    
  }
}

function TrailInfoListing(props){
  let className = "trail-info-listing"
  if(props.justifyRight){
    className += " right"
  }
  return (
    <div className={className}>
      <h2>{props.value}</h2>
      <p>{props.title}</p>
    </div>
  );
}

function TrailInfo(props){
  return(
    <div className="trail-info">
    <h5 className="section-title">Hike Overview</h5>
    <div className="info-row">
      <TrailInfoListing  value= {distance} title="Roundtrip"/>
      <TrailInfoListing  justifyRight={true} value={difficulty} title="Difficulty"/>
    </div>
    <div className="info-row">
      <TrailInfoListing value={elevation} title="Elevation Gained"/>
      <TrailInfoListing justifyRight={true} value={avgTime} title="Average Hike Time"/>
    </div>
    <div className="info-row">
      <TrailInfoListing value={terrain} title="Terrain Type(s)"/>
    </div>
  </div>
  );
}

function Divider(){
  return (
    <div className="divider"></div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppHeader name="Mount Si" area="Snoqualmie Region -- North Bend Area"/>
    <Divider />
    <DisplayWeather />
    <Divider />
    <TrailInfo />
    <Divider />
    <App />
    <BarChart data={[5,10,1,3]} size={[400,400]} />
    <Divider />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
