console.log('Client side javascript file is loaded')


const weatherInput=document.querySelector('form') //get the form
const search = document.querySelector('input') // get data after submit


const locationInput= document.querySelector('#mess1') //p1 id
const forecast= document.querySelector('#mess3') //p2 id
const country=document.querySelector('#mess2')
const temp= document.querySelector('#mess4')
const feelslike= document.querySelector('#mess5')
const precipitaion = document.querySelector('#mess6')
const humid=document.querySelector('#mess7')
const uv=document.querySelector('#mess8')
const time= document.querySelector('#mess9')




weatherInput.addEventListener('submit',(event)=>{
    event.preventDefault()  // not to refresh the browser
    const location =search.value

    locationInput.textContent = 'Locating................'
    country.textContent=''
    temp.textContent=''
    feelslike.textContent=''
    forecast.textContent=''
    humid.textContent=''
    precipitaion.textContent=''
    uv.textContent=''
    time.textContent=''

    fetch('/weather?address=' +location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            locationInput.textContent= data.error
        }else{
            locationInput.textContent='Location: '+ data.location
            country.textContent='Country: ' +data.forecastData.country
            temp.textContent='Temperature outside: '+ data.forecastData.temp+'°C'
            feelslike.textContent='Feels like: '+data.forecastData.feelslike+'°C'
            forecast.textContent='Forecast today: '+data.forecastData.desc
            humid.textContent='Humidity: '+data.forecastData.humid+'%'
            precipitaion.textContent='Precipitation: '+data.forecastData.precipi+'%'
            uv.textContent="UV index: "+data.forecastData.uv
            time.textContent='Observation time: '+data.forecastData.time
        }
    })
})
})