import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import useParkingStore from './parkingStoreContext';
import { useMap } from '@vis.gl/react-google-maps';
import { FaStar } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa"; 

const InformationWindow = () => {
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);
  const isInfoWindowOpen = useParkingStore((state)=> state.isInfoWindowOpen)
  const [infoContent, setInfoContent] = useState(null);
  const placesLib = useMapsLibrary("places");
  const map = useMap();


  useEffect(() => {
    if (!selectedParkingID) return;

    const service = new placesLib.PlacesService(map);

    service.getDetails(
      {
        placeId: selectedParkingID,
        fields: ["name", "rating", "review", "photos", "formatted_address"]
      }, (place, status) => {
        console.log(place)
        if (status === placesLib.PlacesServiceStatus.OK) {
          setInfoContent({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            photos: place.photos ? place.photos.map((photo) => photo.getUrl()) : [],
          });
        } else {
          console.error("Failed to fetch place details:", status);
        }
      }
    );
  }, [selectedParkingID, placesLib]);

  if (!isInfoWindowOpen) return null;

  return (
    <div className='overflow-y-auto h-screen'>
      {infoContent ? (
        <div className='flex flex-col space-y-4 mx-1'>
         
            <img src={infoContent?.photos[0]} alt={`${infoContent.name} photo `} />
         
          <h2 className='font-inter text-4xl my-5 '>{infoContent.name}</h2>
          <p className='text-xl'>{infoContent.address}</p>
          <span className='flex items-center text-2xl'><FaStar className='text-yellow-400 text-2xl'/>{infoContent.rating}</span>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InformationWindow;
