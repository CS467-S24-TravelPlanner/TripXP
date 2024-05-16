import { React, useEffect, useState, useRef } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import ExperienceList from "../components/ExperienceList";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import {
  Box,
  Grid,
  FilledInput,
  Button,
  FormControl,
  Stack,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
} from "@mui/material";
import Experience from "../components/ExperiencePage/Experience";
import { getKeywords } from "../utilities/Keywords";
import {
  getCoordinates,
  haversineDistance,
} from "../utilities/LocationService";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// This has to be outside of the component to avoid an infinite rerender loop
const libraries = ["places", "marker"];

const keywordsList = getKeywords();

function ExperienceSearch() {
  // Current experience list
  const [expList, setExpList] = useState({ data: [] });

  const [currentExperience, setCurrentExperience] = useState(null);

  // Search state
  const [searchBy, setSearchBy] = useState("Location");
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchDistance, setSearchDistance] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Map state
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);

  // Hardcoded size of the Map window
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  // Center of the map when it loads
  const center = {
    lat: 38.4947704, // default latitude
    lng: -98.421832, // default longitude
  };

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

  // Update the bounds of the map when the user zooms, moves, etc.
  const onBoundsChanged = () => {
    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  };

  // Render the map component or relevant error message
  // While this would ideally be a separate component, moving it here prevents several
  // React-related issues with props and rendering.
  const renderMap = () => {
    if (loadError) {
      return <div>Error loading maps</div>;
    } else if (!isLoaded) {
      return <div>Loading maps</div>;
    } else {
      return (
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
            zoom={2}
            center={center}
          >
            <div>
              {expList.data.map((e, i) => {
                if (mapRef) {
                  if (
                    mapRef.current
                      .getBounds()
                      .contains({ lat: e.latitude, lng: e.longitude })
                  )
                    return (
                      <MarkerF
                        position={{ lat: e.latitude, lng: e.longitude }}
                        key={i}
                      />
                    );
                }
              })}
            </div>
          </GoogleMap>
        </Box>
      );
    }
  };

  // This Hook handles the search functionality
  useEffect(() => {
    // Get all experiences from the DB
    getExperiences().then((results) => {
      if (searchParams) {
        
        // Create empty list of experiences
        let updatedExpList = { data: [] };
        // Iterate through experiences
        for (let i = 0; i < results.data.length; i++) {
          let exp = results.data[i];

          if (searchBy === "Keyword") {
            // Split experience keywords into an array - easier to work with.
            let expKeywords = exp.keywords.toString().split(",");
            // Iterate through experience keywords
            for (let j = 0; j < expKeywords.length; j++) {
              // If matching keyword is found, add that experience to the list
              if (expKeywords[j] == searchParams) {
                updatedExpList.data.push(exp);
                break; // Experience added to list, no need to keep checking keywords
              }
            }
          } else {
            // Experience location as Coords object
            let expCoords = { lat: exp.latitude, lng: exp.longitude };

            console.log(haversineDistance(expCoords, searchLocation))
            // Calculate distance between points and add Experience if within range
            if (haversineDistance(expCoords, searchLocation) <= searchDistance) {
              updatedExpList.data.push(exp);
            }
          }
        }

        // Return list of experiences with matching keywords
        setExpList(updatedExpList);
      } else {
        // Return all experiences if no search parameters
        setExpList(results);
      }
    });
  }, [searchParams]);

  // This Hook calls for initial Map render and a rerender on Search
  useEffect(() => {
    setMap(renderMap());
  }, [isLoaded, expList]);

  // Updates search parameters when submitted - triggers useEffect hook
  const handleSubmit = (e) => {

    setSearchParams(searchInput);
    
    // Set searchlocation coordinates, if needed
    if (searchBy === "Location") {
      locationSearch(searchParams)
    }
    
    setSearchInput("");
    e.preventDefault();
  };

  // Updates input as it is changed
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    e.preventDefault();
  };

  // Opens Experience View when user clicks on Exp in list
  const handleExperienceClick = (exp) => {
    setCurrentExperience(exp);
  };

  // Closes Experience View 
  const handleExperienceClose = () => {
    setCurrentExperience(null);
    renderMap();
  };

  // Handles Toggle between Keyword and Location Search
  const handleSearchToggle = (e, val) => {
    if (val) {
      setSearchBy(val);
      setSearchInput("");
      setSearchLocation(null);
    }
  };

  // Change Value from Distance Slider
  const handleDistanceChange = (e, val) => {
    if (val) {
      setSearchDistance(val);
    }
  };

  // Gets location information for user input on location search
  const locationSearch = (location) => {
    getCoordinates(location).then((response) => {
      console.log(response);
      setSearchLocation(response.results[0].geometry.location);
    });
  };

  return currentExperience ? (
    <Experience
      experience={currentExperience}
      closeExperience={handleExperienceClose}
    />
  ) : (
    <div>
      <Box
        component="form"
        alignItems="center"
        display="flex"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Stack
          direction="row"
          sx={{ m: 2, width: "100%", alignItems: "center" }}
        >
          <ToggleButtonGroup
            sx={{ m: 1 }}
            size="small"
            value={searchBy}
            exclusive
            onChange={handleSearchToggle}
          >
            <ToggleButton value="Location">Location</ToggleButton>
            <ToggleButton value="Keyword">Keyword</ToggleButton>
          </ToggleButtonGroup>

          {searchBy === "Location" ? (
            <Box display="flex" width="100%">
              <FormControl sx={{ m: 1, width: "20%" }}>
                <InputLabel id="distance-label" size="small" sx={{ m: 2 }}>
                  Within {searchDistance} Miles
                </InputLabel>
                <Slider
                  defaultValue={25}
                  valueLabelDisplay="auto"
                  shiftStep={50}
                  step={25}
                  marks
                  min={25}
                  max={250}
                  onChange={handleDistanceChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <FilledInput
                  id="search"
                  label="Search for Experiences by Location"
                  type="search"
                  onChange={handleChange}
                  value={searchBy === "Location" ? searchInput : ""}
                  placeholder="Search for Experiences by Location"
                />
              </FormControl>
            </Box>
          ) : (
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="keywords-label">Keywords</InputLabel>
              <Select
                sx={{ m: 1, width: "100%" }}
                labelId="keywords-label"
                id="keywordsSelect"
                value={searchBy === "Keyword" ? searchInput : ""}
                onChange={handleChange}
                input={<FilledInput label="Keywords" id="keywordsInput" />}
                MenuProps={MenuProps}
              >
                {keywordsList.map((keyword) => (
                  <MenuItem key={keyword} value={keyword}>
                    <ListItemText primary={keyword} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl>
            <Button
              type="submit"
              variant="outlined"
              sx={{ m: 1, width: "100%", height: "100%" }}
            >
              Search by {searchBy}
            </Button>
          </FormControl>
        </Stack>
      </Box>
      <Grid
        container={true}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <ExperienceList
          experienceClick={handleExperienceClick}
          experiences={expList.data.filter(function isInMapBounds(location) {
            if (bounds) {
              return bounds.contains({
                lat: location.latitude,
                lng: location.longitude,
              });
            }
          })}
        />

        {map}
      </Grid>
    </div>
  );
}

export default ExperienceSearch;
