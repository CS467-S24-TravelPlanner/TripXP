import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { React, useEffect, useState, useRef } from "react";
import {
  Box,
  Stack,
  Grid,
  FilledInput,
  InputLabel,
  Slider,
  Paper,
} from "@mui/material";
import { getCoordinates, getLocation } from "../utilities/LocationService";
import KeywordsList from "./KeywordsList";
import SlimExperienceList from "./SlimExperienceList";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const libraries = ["places", "marker"];

// Hardcoded size of the Map window
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
};

// Circle default options
const circleOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

function SearchMap({
  expList,
  expClick,
  bounds,
  setBounds,
  center,
  setCenter,
  searchLocation,
  setSearchLocation,
  searchRadius,
  setSearchRadius,
  searchBounds,
  setSearchBounds,
  filteredExpList,
  setFilteredExpList,
  keywords,
  setKeywords,
  selectedExp,
  setSelectedExp,
  circleRef,
}) {
  // This component is a controlled component, and all state is passed down as props
  // Map loading utility function - returns isLoaded bool and Error, if applicable
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  // Use this when a reference of the map instance is needed
  const mapRef = useRef();

  // onLoad callback to get instance of Map and supply inital bounds
  const mapOnLoad = (map) => {
    mapRef.current = map;
    if (circleRef.current) {
      circleRef.current.setMap(map);
    }
    setBounds(mapRef.current.getBounds());
  };

  // Try to get user location from browser
  useEffect(() => {
    useBrowserLocation();
  }, [navigator.geolocation, isLoaded]);

  const useBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const tempCircle = new google.maps.Circle({
          center: userLocation,
          radius: searchRadius,
        });
        setSearchBounds(tempCircle.getBounds());
        setSearchLocation(userLocation);
        setCenter(userLocation);
        getNamedLoc(userLocation);
      });
    } else {
      setSearchLocation(center);
    }
  };

  const getNamedLoc = async (location) => {
    const results = await getLocation(location.lat, location.lng);
    document.getElementById("searchBox").value =
      results.results[0].formatted_address;
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
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
    const newCircle = new google.maps.Circle({
      ...circleOptions,
      center: center,
      radius: radius,
      map: mapRef.current,
    });
    circleRef.current = newCircle;
    setSearchBounds(newCircle.getBounds());
    setCenter(center);
  };

  // Helper function to determine whether an Experience is within search bounds
  const experienceIsInBounds = (exp) => {
    let location = { lat: exp.latitude, lng: exp.longitude };
    return searchBounds.contains(location);
  };

  const experienceHasKeywords = (exp) => {
    const includesAll = (arr, values) => values.every((v) => arr.includes(v));
    return includesAll(exp.keywords, keywords);
  };

  // Update search area radius
  const handleDistanceChange = (e, val) => {
    if (val) {
      setSearchRadius(val * 1609.34); // Convert miles to meters
    }
  };

  // Adjust the search area when the slider changes
  useEffect(() => {
    if (isLoaded) {
      addSearchArea(center, searchRadius);
    }
  }, [searchRadius, center, isLoaded]);

  // Remove and/or remove any Experience Markers after search area or keywords change
  useEffect(() => {
    if (searchBounds) {
      let newExpList = expList.data.filter(experienceIsInBounds);
      if (keywords) {
        newExpList = newExpList.filter(experienceHasKeywords);
      }
      setFilteredExpList(newExpList);
    }
  }, [searchBounds, keywords]);

  if (loadError) {
    return <div>Error loading maps</div>;
  } else if (!isLoaded) {
    return <div>Loading maps</div>;
  } else {
    return (
      <Box
        margin={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "85vh",
          width: "70vw",
        }}
      >
        <h1>Search for Experiences</h1>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={7} sx={{ display: "flex" }}>
            <Paper
              sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column" }}
            >
              <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
                <FilledInput
                  id="searchBox"
                  label="Search for Experiences by Location"
                  type="text"
                  placeholder="Search for Experiences by Location"
                  sx={{ marginBottom: 1, width: "100%", Height: "3.5rem" }}
                />
              </StandaloneSearchBox>
              <GoogleMap
                onLoad={mapOnLoad}
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
                          clickable={true}
                          onClick={() => {
                            if (!selectedExp) {
                              setSelectedExp(e);
                            } else {
                              setSelectedExp(null);
                            }
                          }}
                          label={e == selectedExp ? e.title : ""}
                        />
                      );
                    }
                  })}
                </div>
              </GoogleMap>
            </Paper>
          </Grid>
          <Grid item xs={5} sx={{ display: "flex" }}>
            <Paper
              sx={{
                flex: 1,
                maxWidth: "100%",
                maxHeight: "100%",
                p: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction="row"
                width="100%"
                height="3.5rem"
                alignItems="left"
                alignContent="left"
                sx={{ marginBottom: 1 }}
              >
                <Box minWidth="33%" maxWidth="33%" maxHeight="3rem">
                  <KeywordsList keywords={keywords} setKeywords={setKeywords} />
                </Box>
                <Stack
                  direction="column"
                  minWidth="67%"
                  maxWidth="67%"
                  alignItems="left"
                  alignContent="left"
                >
                  <Box>
                    <InputLabel
                      id="distance-label"
                      size="small"
                      sx={{ display: "inline" }}
                    >
                      Within {Math.floor(searchRadius / 1609.34)} miles
                    </InputLabel>
                  </Box>
                  <Slider
                    value={searchRadius / 1609.34}
                    valueLabelDisplay="auto"
                    shiftStep={100}
                    step={50}
                    marks
                    min={0}
                    max={500}
                    onChange={handleDistanceChange}
                    sx={{ width: "90%", ml: "5%", mr: "5%" }}
                  />
                </Stack>
              </Stack>

              <SlimExperienceList
                experienceClick={expClick}
                experiences={filteredExpList}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default SearchMap;
