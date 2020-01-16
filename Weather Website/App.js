const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    let locallong;
    let locallat;
  const place = searchBox.getPlaces()[0]
  console.log(place.formatted_address)
  if (place == null) return

  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()

  const proxy= "https://cors-anywhere.herokuapp.com/";
  const api = `${proxy}https://api.darksky.net/forecast/444e72390dedff6ef44c8fb8d6c848db/${latitude},${longitude}`;
  
  fetch(api)
    .then(response=>{
      return response.json();
    })
    .then(data=>{
    console.log(data)
    setWeatherData(data, place)
    background(data,place)
    })
   
})

const icon = new Skycons({ color: '#222' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
const humidityElement=document.querySelector('[data-humidity]')
const uvElement=document.querySelector('[data-uv]')
const tips = document.querySelector('[data-tips]')
icon.set('icon', 'clear-day')

function setWeatherData(data, place) {
  locationElement.textContent = place.formatted_address
  statusElement.textContent = data.currently.summary
  temperatureElement.textContent = data.currently.temperature
  precipitationElement.textContent = `${data.currently.precipProbability * 100}%`
  windElement.textContent = data.currently.windSpeed
  humidityElement.textContent=data.currently.humidity
  uvElement.textContent=data.currently.uvIndex

  icon.set('icon', data.currently.icon)
    icon.play()
}
 
function background(data){
    console.log("fk")
    switch(data.currently.summary){
    case 'Clear':
        document.body.style.background='url("blue.jpg")';
        tips.textContent = "Please stay happy for today! :)"
        break;
    case 'Overcast':
        document.body.style.background='url("cloudy.jpg")';
        tips.textContent = "Too sad you cannot see the sky:("
        break;
    case 'Mostly Cloudy':
        document.body.style.background='url("cloudy.jpg")';
        tips.textContent = "Your life is as cloudy as the weather right now"
        break;
    case 'Partly Cloudy':
        document.body.style.background='url("cloudy.jpg")';
        tips.textContent = "Your life is as cloudy as the weather right now!"
        break;
    case 'Foggy':
        document.body.style.background='url("foggy.jpg")';
        tips.textContent = "Too sad you cannot see the sky:("
        break;
    case 'Drizzle':
        document.body.style.background='url("drizzle.jpg")';
        tips.textContent = "Be a man. Don't use umbrella."
        break;
    case 'Light Rain':
        document.body.style.background='url("rain.jpg")';
      tips.textContent = "Nice to walk around and get wet."
        break;
    case 'Rain':
      document.body.style.background='url("rain.jpg")';
      tips.textContent = "Nice to walk around and get wet."
        break;
    case 'Light Rain and Windy':
         document.body.style.background='url("rain.jpg")';

        tips.textContent = "Be a man. Don't use umbrella."
        break;
    case 'Snow':
        document.body.style.background='url("snow.jpg")';
        tips.textContent = "HA It's white all over!Please stay warm and wear sweaters and puffer Jacket!"
        break;
    case 'Flurries':
         document.body.style.background='url("snow.jpg")';
         tips.textContent = "HA It's white all over!Please stay warm and wear sweaters and puffer Jacket!"
    default:
        break;

    }
    console.log(data)


    
    
}

