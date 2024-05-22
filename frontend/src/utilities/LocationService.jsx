const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL_BASE = "https://maps.googleapis.com/maps/api/";

/**
 * getCoordinates takes a location (address, city, etc.) and returns
 * the coresponding location data, including the coordinates.
 * @param {string} location - The location for which to get information.
 */
export async function getCoordinates(location) {
  const options = {
    method: "GET",
  };
  const response = await fetch(
    API_URL_BASE + "geocode/json?address=" + location + "&key=" + API_KEY,
    options
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Error with your request: " + JSON.stringify(response));
  }
}

/**
 * haversineDistance takes two sets of coordinates and returns
 * the distance between them, accounting for Earth's curvature.
 * @param point1 The first location, as a set of coordinates.
 * @param point1.lat Number representing the Latitude of point1
 * @param point1.lng Number representing the Longitude of point1
 * @param point2 The second location, as a set of coordinates.
 * @param point2.lat Number representing the Latitude of point2
 * @param point2.lng Number representing the Longitude of point2
 */
export function haversineDistance(point1, point2) {
  const R = 3958.8; // Radius of the Earth in miles
  const lat1Rads = point1.lat * (Math.PI / 180); // Convert degrees to radians
  const lat2Rads = point2.lat * (Math.PI / 180); // Convert degrees to radians
  const deltaLat = lat2Rads - lat1Rads; // Radian difference (latitudes)
  const deltaLng = (point2.lng - point1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const distance =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1Rads) *
            Math.cos(lat2Rads) *
            Math.sin(deltaLng / 2) *
            Math.sin(deltaLng / 2)
      )
    );
  return distance;
}
