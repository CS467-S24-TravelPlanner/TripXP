import { React, useEffect, useState, useRef } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import ExperienceList from "../components/ExperienceList";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// This has to be outside of the component to avoid an infinite rerender loop
const libraries = ["places", "marker"];

function ExperienceSearch() {
  const [expList, setExpList] = useState({ data: [] });
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useState("NONE");
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState({});

  // Hardcoded size of the Map window
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    position: "relative"
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
        <div className="experience-map" style={{ position: 'relative', width: '70vw', height: '50vh' }}>
        <GoogleMap
          onLoad={onLoad}
          onBoundsChanged={onBoundsChanged}
          mapContainerStyle={mapContainerStyle}
          zoom={2}
          center={center}
        >
          <div>
            {expList.data.map((e, i) => {
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
            })}
          </div>
        </GoogleMap>
        </div>
      );
    }
  };

  // This Hook handles the keyword search functionality
  useEffect(() => {
    // Get all experiences from the DB
    getExperiences().then((results) => {
      if (searchParams) {
        // Create empty list of experiences
        let updatedExpList = { data: [] };
        // Iterate through experiences
        for (let i = 0; i < results.data.length; i++) {
          let exp = results.data[i];
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
    e.preventDefault();
  };

  // Updates input as it is changed
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="searchpage-body">
      <div className="searchbar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search for Experiences by Keyword"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <ExperienceList
        experiences={expList.data.filter(function isInMapBounds(location) {
          return bounds.contains({
            lat: location.latitude,
            lng: location.longitude,
          });
        })}
      />

      {map}

    </div>
  );
}

export default ExperienceSearch;
