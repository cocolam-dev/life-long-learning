const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;

let int = setInterval(blurring, 15);

function blurring() {
  load++;

  if (load > 99) {
    clearInterval(int);
  }

  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px`
}

// from stackoverflow
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

// ---------------------------------------------------------------Google map

const markers = [
  {
    latLng: { lat: -33.7037, lng: 149.8543 },
    content: "<p>Oberon</p>"
  },
  {
    latLng: { lat: -33.949, lng: 149.855 },
    content: "<p>Boggy Swamp Road</p>"
  }
]

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const myLatlng = new google.maps.LatLng(-33.7037, 149.8543);
  const mapOptions = {
    zoom: 10,
    center: myLatlng
  }
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  for (let i = 0; i < markers.length; i++) {
    addMarker(map, markers[i]);
  }
}

function addMarker(map, marker) {
  let newMarker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: marker.latLng,
    map,
    title: marker.content,
  });

  let infoWindow = new google.maps.InfoWindow({
    content: marker.content,
  });

  newMarker.addListener("click", function () {
    infoWindow.open(map, newMarker);
  });

}

initMap();

