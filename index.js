// console.log("Hello");
// let API_key="8faaa2d181970b428bb3090679a3fc15";

// async function fetchWeatherDetails(){
//     try{
//         let lat=87.633;
//     let lon=28.3333;
//     const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
//     const data=await response.json();
//     console.log("Weather data:-> " ,data);
//     // let newPara=document.createElement('p');
//     // newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`;
//     // document.body.appendChild(newPara);
//     renderWeatherInfo(data);

//     }
//     catch(err){
//         console.log("Error found",err);
//     }
// }
// function renderWeatherInfo(data){
//     let newPara=document.createElement('p');
//     newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`;
//     document.body.appendChild(newPara);
// }
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocator support from your browser");
    }
}
function showPosition(position){
    let lati=position.coords.latitude;
    let longi=position.coords.longitude;
    console.log(lati);
    console.log(longi);
}