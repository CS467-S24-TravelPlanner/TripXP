const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL_BASE = "https://maps.googleapis.com/maps/api/geocode/";

export async function getCoordinates(location) {
  const options = {
    method: "GET",
  };
  const response = await fetch(
    API_URL_BASE + "json?address=" + location + "&key=" + API_KEY,
    options
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Error with your request: " + JSON.stringify(response));
  }
}
