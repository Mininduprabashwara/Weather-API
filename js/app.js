// ---------------------Weather API---------------------
 const apiKey = "bdf15ef4a1514140b35105030261210";
 const baseUrl = "http://api.weatherapi.com/v1";

 fetch(`${baseUrl}/current.json?key=${apiKey}&q=Galle`).then(res => res.json()).then(data =>{
     console.log(data);

     document.getElementById("weatherInfo").innerHTML = `
     <div>
         <h1>${data.current.condition.text}</h1>
         <img src="${data.current.condition.icon}" alt="">
         <p>${data.current.temp_c}°C</p>
         <p>${data.current.humidity}%</p>
     </div>`
 });

  const apiKey = "bdf15ef4a1514140b35105030261210";
  const baseUrl = "http://api.weatherapi.com/v1";

 function btnSearchCityOnAction() {
     let city = document.getElementById("txtcity").value;
     console.log("log 01");
    
     fetch(`${baseUrl}/current.json?key=${apiKey}&q=${city}`).then(res => res.json()).then(data => {
         console.log(data);
         console.log("log 02");
        
         document.getElementById("weatherInfo").innerHTML = `
     <div>
         <h1>${data.location.name}</h1>
         <h1>${data.current.condition.text}</h1>
         <img src="${data.current.condition.icon}" alt="">
         <p>${data.current.temp_c}°C</p>
         <p>${data.current.humidity}%</p>
     </div>`
     });
     console.log("log 03");
    
 }

 navigator.geolocation.getCurrentPosition((position) => {
     console.log(position);
     console.log(position.coords.latitude);
     console.log(position.coords.longitude);
    
    
    
 });


// console.log("log 01");
// console.log("log 02");
// console.log("log 03");
// console.log("log 04");
