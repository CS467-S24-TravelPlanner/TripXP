import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const libraries = ["places", "marker"];
const mapContainerStyle = {
  width: "70vw",
  height: "50vh",
};
const center = {
  lat: 38.4947704, // default latitude
  lng: -98.421832, // default longitude
};

const ExperienceMap = ({experiences}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,

  });


  const [expList, setExpList] = useState([]);

  useEffect(() => {
    setExpList(experiences);
  }, [experiences]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }


  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={center}>
          <div>
          {expList.map((e, i) => {
            return (<MarkerF position={{ lat: e.latitude, lng: e.longitude }} key={i}/>);
          })}
          </div>
      </GoogleMap>
    </div>
  );
};

export default ExperienceMap;
