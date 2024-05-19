import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  StandaloneSearchBox,
  Circle,
} from "@react-google-maps/api";
import ExperienceList from "./ExperienceList";
import { React, useEffect, useState, useRef } from "react";
import {
  Box,
  Stack,
  Grid,
  FilledInput,
  InputLabel,
  Slider,
} from "@mui/material";
import { getCoordinates } from "../utilities/LocationService";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const libraries = ["places", "marker"];

// Hardcoded size of the Map window
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
};

// Center of the map when it loads
const defaultCenter = {
  lat: 38.4947704, // default latitude
  lng: -98.421832, // default longitude
};

function SearchMap({ expList, expClick }) {
  // Map state
  const [bounds, setBounds] = useState(null); // Can be used to search by moving map, not implemented
  const [center, setCenter] = useState(defaultCenter);

  // Search state variables
  const [searchLocation, setSearchLocation] = useState(null); // Coordinates of the search location
  const [searchRadius, setSearchRadius] = useState(1000); // Search radius in meters
  const [searchBounds, setSearchBounds] = useState(null); // Search Area on Map

  // The list of Experiences meeting search parameters
  const [filteredExpList, setFilteredExpList] = useState(expList.data);

  // Map loading utility function - returns isLoaded bool and Error, if applicable
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  // Use this when a reference of the map instance is needed
  const mapRef = useRef();

  // onLoad callback to get instance of Map and supply inital bounds
  const onLoad = (map) => {
    mapRef.current = map;
    setBounds(mapRef.current.getBounds());
  };

  // Handles search functionality
  const onPlacesChanged = () => {
    // Retrieve latitude and longitude of Search Location
    getCoordinates(document.getElementById("searchBox").value).then(
      (results) => {
        setSearchLocation(results.results[0].geometry.location);
        addSearchArea(results.results[0].geometry.location, searchRadius);
        setCenter(results.results[0].geometry.location);
      }
    );
  };

  // Update the bounds of the map when the user zooms, moves, etc.
  const onBoundsChanged = () => {
    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  };

  // Create a circular search area on map
  const addSearchArea = (center, radius) => {
    const newCircle = new google.maps.Circle({
      center: center,
      radius: radius,
    });
    setSearchBounds(newCircle.getBounds());
    setSearchRadius(radius);
    setCenter(center);
  };

  // Helper function to determine whether an Experience is within search bounds
  const experienceIsInBounds = (exp) => {
    let location = { lat: exp.latitude, lng: exp.longitude };
    return searchBounds.contains(location);
  };

  // Update search area radius
  const handleDistanceChange = (e, val) => {
    if (val) {
      setSearchRadius(val * 1000);
    }
  };

  // Adjust the search area when the slider changes
  useEffect(() => {
    if (isLoaded) {
      addSearchArea(center, searchRadius);
    }
  }, [searchRadius]);

  // Remove and/or remove any Experience Markers after search area changes
  useEffect(() => {
    if (searchBounds) {
      let newExpList = expList.data.filter(experienceIsInBounds);
      setFilteredExpList(newExpList);
    }
  }, [searchBounds]);

  if (loadError) {
    return <div>Error loading maps</div>;
  } else if (!isLoaded) {
    return <div>Loading maps</div>;
  } else {
    return (
      <Stack margin={3}>
        <h1>Search for Experiences</h1>
        <InputLabel id="distance-label" size="small" sx={{ m: 2 }}>
          Within {searchRadius / 1000} Km
        </InputLabel>
        <Slider
          defaultValue={0}
          valueLabelDisplay="auto"
          shiftStep={100}
          step={25}
          marks
          min={0}
          max={500}
          onChange={handleDistanceChange}
        />
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
          <FilledInput
            id="searchBox"
            label="Search for Experiences by Location"
            type="text"
            placeholder="Search for Experiences by Location"
            sx={{ m: 1, width: "100%" }}
          />
        </StandaloneSearchBox>

        <Grid
          container={true}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <ExperienceList
            experienceClick={expClick}
            experiences={filteredExpList}
          />

          <Box
            component="section"
            height={500}
            width={700}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <GoogleMap
              onLoad={onLoad}
              onBoundsChanged={onBoundsChanged}
              mapContainerStyle={mapContainerStyle}
              zoom={
                searchLocation
                  ? searchRadius < 50001
                    ? 9
                    : searchRadius < 100000
                    ? 8
                    : searchRadius < 200000
                    ? 7
                    : searchRadius < 400000
                    ? 6
                    : 5
                  : 3
              }
              center={center}
            >
              <div>
                {filteredExpList.map((e, i) => {
                  if (
                    !searchBounds ||
                    searchBounds.contains({
                      lat: e.latitude,
                      lng: e.longitude,
                    })
                  ) {
                    return (
                      <MarkerF
                        position={{ lat: e.latitude, lng: e.longitude }}
                        icon={{
                          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                          scale: 5,
                        }}
                        key={i}
                      />
                    );
                  }
                })}
              </div>
              <div>
                {searchLocation ? (
                  <div>
                    <MarkerF
                      position={searchLocation}
                      icon={{
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                        scale: 4,
                      }}
                    />
                        <Circle

      center={center}
      options = {{
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: searchRadius,
        zIndex: 1
      }}
    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </GoogleMap>
          </Box>
        </Grid>
      </Stack>
    );
  }
}

export default SearchMap;
