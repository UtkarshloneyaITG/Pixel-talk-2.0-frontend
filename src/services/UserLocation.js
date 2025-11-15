

function getLocation() {
    try {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser.");
            return;
        }


        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // console.log("Latitude:", lat, "Longitude:", lon);

                const UserLocation = {
                    lat,
                    lon
                }

                console.log(UserLocation);
                return UserLocation;
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.error("The request to get user location timed out.");
                        break;
                    default:
                        console.error("An unknown error occurred while fetching location.");
                        break;
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );


    } catch (error) {
        console.error("Something went wrong in finding location:", error);
    }
}


// // Haversine formula for location radius
// function Haversine(lat1, lon1, lat2, lon2) {

//     const EarthRadius = 6371 //in Km

//     const toRadians = angle => angle * Math.PI / 180;

//     const phi1 = toRadians(lat1);
//     const phi2 = toRadians(lat2);
//     const deltaPhi = toRadians(lat2 - lat1);
//     const deltaLamda = toRadians(lon2 - lon1);

//     const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLamda / 2);

//     const c = 2 * Math.asin(Math.sqrt(a));

//     return EarthRadius * c; //distance in Km
// };

export default getLocation ;
