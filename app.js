// e3ce5b0685c0a50afe6e9276acffc5d6
// api.openweathermap.org/data/2.5/weather?q={city name}&APPID={API key}
const weatherApi={
    key:"e3ce5b0685c0a50afe6e9276acffc5d6",
    url:"https://api.openweathermap.org/data/2.5/weather?"
}

const inp=document.getElementById('inp-box');
const cityNameId=document.getElementById('city');
const dateId=document.getElementById('date');
const tempId=document.getElementById('temp');
const temprangeId=document.getElementById('temp-range');
const weatherId=document.getElementById('weather');
const image=document.getElementById('image');

inp.addEventListener('keypress',(e)=>{
    // console.log(inp.value);
    const city = inp.value;
    if(e.key==='Enter'){
        console.log('done');
        getweatherReport(city);   
        document.querySelector('.weather-info').style.display="block";     
    }
})

// Get Weather Report
    function getweatherReport(city){
        fetch(`${weatherApi.url}q=${city}&APPID=${weatherApi.key}&units=metric`)
        .then((weather)=>{
            // console.log(res.json());
            return weather.json();
        })
        .then(showWeatherReport);
    }

// Show Weather Report

    function showWeatherReport(weather) {
        console.log(weather);

        let cityName=weather.name;
        // console.log(cityName);
        let country=weather.sys.country;
        cityNameId.innerText=`${cityName},${country}`;

        let temp=weather.main.temp;
        tempId.innerHTML=`${Math.round(temp)}&deg;C`;

        let temprange=weather.main;
        temprangeId.innerHTML=`${Math.floor(temprange.temp_min)}&deg;C(Min)/${Math.ceil(temprange.temp_max)}&deg;C(Max)`;
        
        let weatherType=weather.weather[0].main;
        weatherId.innerText=weatherType;

        let todayDate = new Date();
        dateId.innerText=dateManage(todayDate);

        // console.log(weatherType);
        if(weatherType == 'Clear'){
            document.body.style.backgroundImage = "url('Image/clear.jpg')";
            image.setAttribute('src',"icons/clear.png");
        }
        else if(weatherType == 'Clouds'){
            document.body.style.backgroundImage = "url('Image/clouds.jpg')";
            image.setAttribute('src',"icons/cloud.png");
        } 
        else if(weatherType == 'Dizzle'){
            document.body.style.backgroundImage = "url('Image/dizzle.jpg')";
            image.setAttribute('src',"icons/dizzle.png");
        } 
        else if(weatherType == 'Haze'){
            document.body.style.backgroundImage = "url('Image/haze.jpg')";
            image.setAttribute('src',"icons/haze.png");
        } 
        else if(weatherType == 'Mist'){
            document.body.style.backgroundImage = "url('Image/mist.jpg')";
            image.setAttribute('src',"icons/mist.png");
        } 
        else if(weatherType == 'Snow'){
            document.body.style.backgroundImage = "url('Image/snow.jpg')";
            image.setAttribute('src',"icons/snow.png");
        } 
        else if(weatherType == 'Sunny'){
            document.body.style.backgroundImage = "url('Image/sunny.jpg')";
            image.setAttribute('src',"icons/sun.png");
        } 
        else if(weatherType == 'Thunderstorm'){
            document.body.style.backgroundImage = "url('Image/thunderstorm.jpg')";
            image.setAttribute('src',"icons/thunder.png");
        } 

    }

// Date Manage
    function dateManage(dateArg){
        let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let months= ["January","February","March","April","May","June","July","August","September","October","November","December"];

        let year = dateArg.getFullYear();
        let month = months[dateArg.getMonth()];
        let date = dateArg.getDate();
        let day = days[dateArg.getDay()];

        return `${date} ${month} (${day}),${year}`;
    }
