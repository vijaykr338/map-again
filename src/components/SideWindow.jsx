import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
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
import ParkingSpots from './ParkingSpots';

// Adjust the import path if necessary

const SideWindow = ({ onPlaceSelect, parkingData }) => {
 

    const PlaceAutocomplete = ({ onPlaceSelect }) => {
        const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
        const inputRef = useRef(null);
        const places = useMapsLibrary("places");
      
        useEffect(() => {
          if (!places || !inputRef.current) return;
      
          const options = {
            fields: ["geometry", "name", "formatted_address"],
          };
      
          setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
         
        }, [places]);
        useEffect(() => {
          if (!placeAutocomplete) return;
      
          placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
          });
          
        }, [onPlaceSelect, placeAutocomplete]);
        return (
          <div className="autocomplete-container flex items-center ">
            <input placeholder='Type Address, Venue, City or Place' className="placeholder-slate-600 w-full h-14 px-6 border rounded-full" ref={inputRef} />
            <CiSearch className='absolute right-10 size-7'/>
          </div>
        );
      };
      

  return (
    <div className='w-[750px] h-screen bg-white flex flex-col space-y-4 px-5 py-4'>
      <h1 className='font-inter font-bold text-3xl'>Book Parking Near</h1>
      <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
      <ParkingSpots parkingData={parkingData}/>
    </div>
  );
};

export default SideWindow;