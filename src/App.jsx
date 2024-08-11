
  import React, { useState, useEffect, useRef } from "react";
  import { createRoot } from "react-dom/client";
  import { InfoWindow } from "@vis.gl/react-google-maps";
  import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
  } from "@vis.gl/react-google-maps";
  import SideWindow from "./components/SideWindow";


  //insert your own api key here
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY

  //https://visgl.github.io/react-google-maps/docs/get-started
  //a lot of examples were taken from here

  const App = () => {
    const [parkingData, setParkingData] = useState([])
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    return (
      <APIProvider
        apiKey={API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <div className="relative w-screen h-screen">
          <Map
            style={{ width: "100vw", height: "100vh" }}
            //this width is necessary for map working
            mapId={"e43f831b5ad9c238"}
            // mapId={"fe442564d6c0b923"} to restore map markers
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
            {selectedPlace && (
              <NearbyPlaces place={selectedPlace} marker={marker} setParkingData={setParkingData} />
            )}
          </Map>
          <MapHandler place={selectedPlace} marker={marker} />
          <div className="absolute top-0 left-0 z-10">
            <SideWindow onPlaceSelect={setSelectedPlace} parkingData={parkingData} />
          </div>
        </div>
      </APIProvider>
    );
  };

  const MapHandler = ({ place, marker }) => {
    const map = useMap();
    //for working with maps 
    //the usual format is https://visgl.github.io/react-google-maps/docs/get-started
    //see the hooks part

    useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      console.log(place.geometry?.viewport)
      

      marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
  };

  const NearbyPlaces = ({ place, setParkingData }) => {
    const map = useMap();
    const placesLib = useMapsLibrary("places");
    //Places API is our bread and butter for working
    const [nearbyMarkers, setNearbyMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [infoContent, setInfoContent] = useState(null);
    

    useEffect(() => {
      if (!placesLib || !map || !place) return;

      const service = new placesLib.PlacesService(map);

      const request = {
        location: place.geometry.location,
        radius: 750, // search within 750 meters
        type: ["parking"], // search for parking places
        fields: ["geometry", "name", "place_id", "vicinity"], // include photos field
      };

      service.nearbySearch(request, (results, status) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          const PhotoOptions = {
            maxHeight: 300,
          };
          console.log(results);
          const markers = results.map(result => ({
            position: result.geometry.location,
            name: result.name,
            address: result.vicinity,
            placeId: result.place_id,
            photos: result.photos ? result.photos.map(photo => photo.getUrl(PhotoOptions)) : [], // extract photo URLs
          }));
          setParkingData(results);
          setNearbyMarkers(markers);
        } else {
          console.error("Nearby search failed:", status);
        }
      });
    }, [placesLib, map, place]);

    const handleMarkerClick = (marker) => {
      setActiveMarker(marker.position);

      const service = new placesLib.PlacesService(map);
     // https://developers.google.com/maps/documentation/places/web-service/details
      service.getDetails({
        placeId: marker.placeId,
        fields: ['name', 'rating', 'formatted_address', 'review'], 
      }, (place, status)=> {
        console.log(place)
      
        if (status === placesLib.PlacesServiceStatus.OK) {
          setInfoContent({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            photos: marker.photos,
            
          });
        } else {
          console.error("Failed to fetch place details:", status);
        }
      })

     
    };

    return (
      <>
        {nearbyMarkers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={marker.position}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {activeMarker && infoContent && (
          <InfoWindow
            position={activeMarker}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h2>{infoContent.name}</h2>
              <p>{infoContent.address}</p>
              {console.log(infoContent)}
              {infoContent.photos && infoContent.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`${infoContent.name} photo ${index + 1}`} />
              ))}

              
            </div>
          </InfoWindow>
        )}
      </>
    );
  };


  export default App
