const API = "http://localhost:3000";

var btn = document.getElementById("btn");

var globallat=0;
var globallog=0;




btn.addEventListener('click', async () => {
  var text = document.getElementById("address").value;
  console.log(text);

  const data = { text };
  const options = {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('http://localhost:3000/googlepost', options)
  const dataa = await response.json();
  console.log(dataa);


  globallat = dataa.latitude;
  globallog = dataa.longitude;

  if(globallat !=0 && globallog !=0){

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: globallat, lng: globallog}
    });

    var marker = new google.maps.Marker({
      position: {lat: globallat, lng: globallog},
      map: map
    });
  }


  //Works half way following code:
  /* 
  fetch(`http://localhost:3000/googleres`)
      .then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
        });
    }) 
*/



});


//Simulation
var mypositionlat = -37.852022;
var mypositionlog = 145.1079;

var lat = [];
var log = [];

lat[0] = -37.852022;
log[0] = 145.1079;

for(i=1;i<=10;i++){
  //Simulation check
  lat[i] = lat[i-1] + 0.005
  log[i] = log[i-1] + 0.005
}

console.log(lat);

function initMap() {
var myLatLng = {lat: mypositionlat, lng: mypositionlog};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: myLatLng
});

Addmarkers(map);
/*
var marker1 = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Hello World!'
});*/
}

function Addmarkers(map){

  for (i=1;i<=10;i++){
    var marker = new google.maps.Marker({
      position: {lat: lat[i], lng: log[i]},
      map: map
    });
  }
}