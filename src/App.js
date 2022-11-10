import React,{useState} from "react";
import axios from 'axios';
import '../src/assets/weather.png';
import './index.css';

function App() {

  const [Location, setLocation] = useState('')
  const [Name, setName] = useState()
  const [Temperature, setTemperature] = useState()
  const [Description, setDescription] = useState()
  const [FeelsLike, setFeelsLike] = useState()
  const [Humidity, setHumidity] = useState()
  const [Speed, setSpeed] = useState()

  const background = {
    backgroundColor:'rdba(0,0,0,0.5)',
    position:'relative',
    width:'100%',
    height:'100%',
    color:'#fff',
    fontFamily:'Courier New, monospace',
  }

  const p = {
    fontSize: '2em',
    fontWeight:'bold',
  }

  const H1 = {
    fontSize: '4em',
  }

  const h = {
    fontSize: '6em',
    fontWeight:'bold',
    marginTop:'1em'
  }

  const showDescription = {
    fontSize:'2em',
    fontWeight:'bold',
  }

  const container ={
    maxWidth:'900px',
    height:'700px',
    margin:'auto',
    padding:'0 1rem',
    position:'relative',
    top:'10%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  }

  const results ={
    position:'relative',
    display:'flex',
    textAlign:'center',
    width:'1000px',
    justifyContent:'space-between',
    marginLeft:'-4em'
  }

  const inputdiv = {
    padding:'1rem',
    textAlign:'center',
  }

  const search = {
    padding: '0.7rem 1.5rem',
    fontSize:'2em',
    borderRadius:'20px',
    fontFamily:'Courier New, monospace',
    border:'1px solid rgba(255,255,255,0.8)',
    backgroundColor:'rgba(255,255,255,0.4)',
    color:'white',
    fontWeight:'bold',
    marginTop:'1em',
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=imperial&appid=4d732329e6da628ff6374c77996cad7f`

  const searchLocation = (event)=>{
    if(event.key === 'Enter'){
      axios.get(url).then((response)=>{
        console.log(response.data)
        setName(response.data.name)
        setTemperature(response.data.main.temp.toFixed())
        setDescription(response.data.weather[0].description.toUpperCase())
        setFeelsLike(response.data.main.feels_like.toFixed())
        setHumidity(response.data.main.humidity)
        setSpeed(response.data.wind.speed.toFixed())
      })
      setLocation('')
    }
  }

  return (
    <div className="App" style={background}>
      <div style={inputdiv}>
        <input
          value={Location}
          type='text'
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          style={search}>
        </input>
      </div>
      <div style={container}>
        <div>
          <div style={results}>
            <div>
              <h1 style={H1}>{Name}</h1>
            </div>
            <div style={{ marginLeft:'3em', marginTop:'1em' }}>
              {Name?<h style={h}>{Temperature}'F</h>:null}
            </div>
            <div style={{ marginLeft:'3em', marginTop:'2em' }}>
              <p style={showDescription}>{Description}</p>
            </div>
          </div>
        </div>
        {Name !== undefined &&
          <div className="bottom">
            <div style={p}>
              <p>{FeelsLike}'F</p>
              <p>Feels Like</p>
            </div>
            <div style={p}>
              <p>{Humidity}%</p>
              <p>Humidity</p>
            </div>
            <div style={p}>
              <p>{Speed} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
