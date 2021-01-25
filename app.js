window.addEventListener("load", ()=> {
 let long;
 let lat;
 let temperatureDescription = document.querySelector(".temperature-description");
 let temperatureDegree = document.querySelector(".temperature-degree");
 let locationTimezone = document.querySelector(".location-timezone");
 let temperatureSection = document.querySelector(".temperature");
 const temperatureSpan = document.querySelector(".temperature span");

 if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position =>{
     long = position.coords.longitude;
     lat= position.coords.latitude;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/f6424eb0fd3bf625405e6607909741bf/${lat},${long}`;

     fetch(api)
     .then(response =>{
     return response.json();
     })
     
     .then(data =>{
     console.log(data);
     const { temperature, summary, icon }= data.currently;

     //set DOM elements from the API
     temperatureDegree.textContent = temperature;
     temperatureDescription.textContent = summary;
     locationTimezone.textContent = data.timezone;

     //formula for celsius
     let celsius = (temperature - 32) * (5 / 9);

     //set icon
     setIcons(icon, document.querySelector(".icon"));

     //set image
     setImage(icon); 

      //change temperature to celsius/farenheit
      temperatureSection.addEventListener("click", () =>{
        if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
        } else {
           temperatureSpan.textContent = "F";
           temperatureDegree.textContent = temperature;
        }
        });

 });
});

 }else{
     h1.textContent = "Please enable your GeoLocation for this app to work";
 }

 function setIcons(icon, iconID){
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
 }

 function setImage(icon) {
    if(icon == "clear-day") {
        document.body.style.backgroundImage = "url('https://cdn.mos.cms.futurecdn.net/r88cRAmYGt9qoebhqzmNwn.jpg')";
    } else if (icon == "clear-night") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "partly-cloudy-night") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "partly-cloudy-day") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "cloudy") {
        document.body.style.backgroundImage = "url('https://i.imgur.com/xRxu2NQ.gif')"
    } else if (icon == "rain") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "sleet") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "snow") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "wind") {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } else if (icon == "fog") {
        document.body.style.backgroundImage = "url('https://media3.giphy.com/media/cIsHRed0PxHhmGx1Gn/giphy.gif?cid=790b7611e31254817676565ff6b3ddd176d13ddd8938fcb3&rid=giphy.gif')";
    } else {
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')";
    } 
} 

});
