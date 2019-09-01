var MedToVel, TbmToMed;
var map,
  dataPath,
  distanceValue = null;
var path_info = null;
var position1, position2;
async function fetchData() {
  const res1 = await fetch("./Data/MedavakkamToVelacherry.json");
  position1 = await res1.json();
  const res2 = await fetch("./Data/TambaramToMedaavkkam.json");
  position2 = await res2.json();
  const res3 = await fetch("./Data/MedavakkamToVelacherry2.json");
  position3 = await res3.json();
  initMap();
}
fetchData();

function initMap() {
  var markerArray = [];
  var dataPath;
  var directionsService = new google.maps.DirectionsService();

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: { lat: 12.9170893, lng: 80.1921982 }
  });

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  var stepDisplay = new google.maps.InfoWindow();

  calculateAndDisplayRoute(
    directionsDisplay,
    directionsService,
    markerArray,
    stepDisplay,
    map
  );
  var onChangeHandler = function() {
    calculateAndDisplayRoute(
      directionsDisplay,
      directionsService,
      markerArray,
      stepDisplay,
      map
    );
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);

  // ============ DATA TO BE UPLOADED =================

  var infoTbmToMed = new google.maps.InfoWindow({
    content: ` <p>51C\n TAMBARAM TO MEDAVAKKAM</p>
    <span style="font-size:15px;cursor:pointer" onclick="openNav()">&#9776; View</span>
    `
  });
  var infoMedToVel = new google.maps.InfoWindow({
    content: `<p>5A\n MEDAVAKKAM TO VELACHERRY </p>
    <span style="font-size:15px;cursor:pointer" onclick="openNav()">&#9776; View</span>
    `
  });
  MedToVel = new google.maps.Marker({
    position: { lat: 12.9170893, lng: 80.1921982 },
    map: map,
    animation: google.maps.Animation.DROP,
    scaledSize: new google.maps.Size(50, 50),
    title: "hello",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/bus.png"
    }
  });
  TbmToMed = new google.maps.Marker({
    position: { lat: 12.924945, lng: 80.100108 },
    map: map,
    animation: google.maps.Animation.DROP,
    scaledSize: new google.maps.Size(70, 70),
    title: "hello",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/bus.png"
    }
  });
  MedToVel1 = new google.maps.Marker({
    position: { lat: 12.9170893, lng: 80.1921982 },
    map: map,
    animation: google.maps.Animation.DROP,
    scaledSize: new google.maps.Size(50, 50),
    title: "hello",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/bus.png"
    }
  });
  TbmToMed.addListener("click", function() {
    infoTbmToMed.open(map, TbmToMed);
  });
  MedToVel.addListener("click", function() {
    infoMedToVel.open(map, MedToVel);
  });
  MedToVel1.addListener("click", function() {
    infoMedToVel.open(map, MedToVel);
  });
}

function calculateAndDisplayRoute(
  directionsDisplay,
  directionsService,
  markerArray,
  stepDisplay,
  map
) {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      travelMode: "WALKING"
    },
    function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
        showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function parser(chunk) {
  let doc = new DOMParser().parseFromString(
    `<div id="main" style="border: 2px solid #eee;box-shadow: #fff 3px 5px;margin:5px; padding:40px;border-left-color: #006EB6;border-left-width: 10;">${chunk}</div>`,
    "text/html"
  );
  return doc;
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  var myRoute = directionResult.routes[0].legs[0]; // data .......
  myRoute.steps.forEach(path => {
    var parsedData = parser(path.instructions);
    document
      .getElementById("routeDisp")
      .appendChild(parsedData.body.firstChild);
  });

  const { start_address, end_address } = myRoute;
  const path_route = `${start_address.split(",")[0]} TO ${
    end_address.split(",")[0]
  }`;
  console.log(path_route);
  document.getElementById("route").innerHTML = path_route;
  document.querySelector(".route").innerHTML = path_route;
  document.getElementById('showroute').innerHTML = path_route;
  dataPath = myRoute;
  // path_info = myRoute.steps[0].instructions;
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = (markerArray[i] = markerArray[i] || new google.maps.Marker());
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
      stepDisplay,
      marker,
      myRoute.steps[i].instructions,
      map
    );
  }

  diplayDetails();
}
function diplayDetails() {
  const { distance, duration } = dataPath;
  console.log(distance.text);
  distanceValue = distance.text;
  console.log(distanceValue);
  document.getElementById("distance").innerHTML = distance.text;
  document.getElementById("time").innerHTML = duration.text;
  document.querySelector(".distance").innerHTML = distance.text;
  document.querySelector(".time").innerHTML = duration.text;
}
function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, "click", function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
var itr = 0;
function updateLocation(marker, position) {
  const location = new google.maps.LatLng(
    parseFloat(position[itr].latitute),
    parseFloat(position[itr].longitude)
  );
  map.setCenter(location);
  marker.setPosition(location);
  if (position2.length >= itr || position1.length >= itr) {
    itr++;
  }
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
const callUpdateHandler = () => {
  updateLocation(TbmToMed, position2);
  updateLocation(MedToVel, position1);
  updateLocation(MedToVel1, position3);
};

setInterval(callUpdateHandler, 1000);
