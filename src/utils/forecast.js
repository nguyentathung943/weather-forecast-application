const request= require('request')


const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=17a37d22c1c46d524b3a6088e0f9e469&query='+lat+','+long+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to the weather services',undefined)
        }
        else if(body.error)
        {
            callback('Unable to locate your location',undefined)
        }
        else{
            callback(undefined,{
                country:body.location.country,
                desc:body.current.weather_descriptions[0],
                temp:body.current.temperature,
                feelslike:body.current.feelslike,
                time:body.current.observation_time,
                humid:body.current.humidity,
                precipi:body.current.precip,
                uv:body.current.uv_index,
            })
        }
    })
}
module.exports = forecast