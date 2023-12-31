import React from 'react'
import {FaPauseCircle , FaPlayCircle} from 'react-icons/fa'
const PlayPause = ({isPlaying  , activeSong, song , handlePauseClick , handlePlayClick})  => {
  console.log("sont coming is :" + song.title);
  console.log("Active Song is  : " +activeSong.title);
  return (
  isPlaying  && activeSong?.title === song.title ?
  <FaPauseCircle
  size={35}
  className = "text-gray-300"
  onClick={handlePauseClick}
  />
  :
  <FaPlayCircle
  size={35}
  className = "text-gray-300"
  onClick={handlePlayClick}
  />
 
  )
}


export default PlayPause