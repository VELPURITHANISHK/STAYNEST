function initMap() {

const map = new google.maps.Map(
document.getElementById("map"),
{
zoom: 12,
center: coordinates
}
);

new google.maps.Marker({
position: coordinates,
map: map
});

}