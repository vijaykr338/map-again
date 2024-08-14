import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import anime from '../assets/anime.jpg'
import boiler from '../assets/default.jpg'
import InformationWindow from './InformationWindow';

const ParkingSpots = ({parkingData}) => {

  const [parkingID, setParkingID] = useState('');
  const [infoWindow, setInfoWindow] = useState(false);

  const ParkingSpotClickHandler = (place_id) => {
    setParkingID(place_id)
    console.log(parkingID)
    setInfoWindow(!infoWindow);
    console.log(infoWindow)
  }
  
       
  return (
    <div className='space-y-5 h-screen w-full'>

      {
        parkingData && parkingData.map((parking)=> {
          return(
              <div
              onClick={()=> ParkingSpotClickHandler(parking.place_id)}
              key={parking.place_id}
              className='flex justify-between border-2 border-black rounded-3xl px-6 py-5'>
        <div>
        <h1 className='font-bold text-3xl'>{parking.name}</h1>
        <span className='flex items-center text-lg'><FaStar className='text-yellow-400'/>{parking.rating}</span>
        <span className='flex items-center text-lg'><FaWalking /> 15 mins</span>
        <div className='text-4xl font-bold items-center'>90 ₹ <span className='text-2xl text-gray-500'>/hour</span> </div>
        </div>

    <img src={parking.photos ? parking.photos.map(photo => photo.getUrl({maxHeight: 300})): boiler} className='h-36 w-36 object-cover object-center rounded-2xl' alt="boiler" />
      </div>
          )
        })
      }

  
    
    </div>
  )
}

export default ParkingSpots
