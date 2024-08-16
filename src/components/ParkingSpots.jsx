import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import anime from '../assets/anime.jpg'
import boiler from '../assets/default.jpg'
import InformationWindow from './InformationWindow';
import useParkingStore from './parkingStoreContext';


const ParkingSpots = ({parkingData}) => {

  const setSelectedParkingID = useParkingStore((state)=> state.setSelectedParkingID)
  const setInfoWindowOpen = useParkingStore((state)=> state.setInfoWindowOpen)
  const isInfoWindowOpen = useParkingStore((state)=> state.isInfoWindowOpen)
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);

  const ParkingSpotClickHandler = (place_id) => {
    if(selectedParkingID !== place_id){
       setSelectedParkingID(place_id)
    setInfoWindowOpen(true)
    }
    else{
      setInfoWindowOpen(!isInfoWindowOpen)
    }
   
    console.log(place_id)
  }
  
       
  return (
    <div className='space-y-5 h-screen'>

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
