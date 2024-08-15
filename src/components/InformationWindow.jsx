import { useMapsLibrary } from '@vis.gl/react-google-maps'
import React from 'react'

const InformationWindow = ({parkingID}) => {
  console.log(parkingID)

  const placesLib = useMapsLibrary("places")

  const placeData = () => {
    const service = new placesLib.PlacesService
  }
  
  return (
    <div className=''>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos repudiandae, exercitationem esse natus ea suscipit labore expedita quidem fuga recusandae hic aliquam ipsam possimus debitis atque itaque sint consequatur quo!
    </div>
  )
}

export default InformationWindow
