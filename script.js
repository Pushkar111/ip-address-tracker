
const btnSearch = document.querySelector(".arrow-btn");
const input = document.getElementById("ip")

const list = document.querySelectorAll(".in-value");

// Last break down the isp text into two lines
const inpIsp = document.querySelector(".in-isp");
inpIsp.innerHTML = inpIsp.textContent.replace(" ", "<br>");

const map = L.map("map").setView([23.033863, 72.585022], 13);
const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' };
const firstTile = L.tileLayer(tileLayer, attribution).addTo(map);


let marker = null;

function sendRequest() {
    let inputValue = input.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_kNbDCZBbDHD6Uyd6YUFTNcHz5tWUL&ipAddress=${inputValue}`) // free 
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.code == 422) {
                alert(data.messages);
            } else {
                list[0].innerText = data.ip;
                list[1].innerText = data.location.city + " " + data.location.region + " " + data.location.country;
                list[2].innerText = data.location.timezone;
                list[3].innerText = data.isp;
            }
            map.flyTo([data.location.lat, data.location.lng], 13);
            if (marker !== null) {
                map.removeLayer(marker);
            }
            marker = L.marker([data.location.lat, data.location.lng], {
                icon: L.icon({
                    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                })
            });
            marker.addTo(map);
            marker.bindPopup(data.location.city + " " + data.location.region + " " + data.location.country).openPopup();
            marker.addEventListener("click", () => {
                map.flyTo([data.location.lat, data.location.lng], 13);
            });
        });
}
btnSearch.addEventListener("click", () => {
    sendRequest();
});
document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        sendRequest();
    }
});
sendRequest();

