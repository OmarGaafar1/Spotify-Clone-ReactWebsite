import React from 'react'

import {useRef , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {Swiper , SwiperSlide } from 'swiper/react'

import { FreeMode } from 'swiper'

import PlayPause from  './PlayPause'
import {playPause, setActiveSong} from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';


import 'swiper/css'
import 'swiper/css/free-mode'

const TopPlay = () => {
  const dispatch = useDispatch();
  const{activeSong , isPlaying} = useSelector((state)=> state.player)
  const {data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  console.log("data is : " + data);
  const topPlays = data.tracks?.slice(0,5);

  useEffect(()=>{
    divRef.current.scrollIntoView({behavior:'smooth'})
  } , [])

  const handlePauseClick =() => {
    dispatch(PlayPause(false))

  }


  const handlePlayClick =() => {
    dispatch(setActiveSong({song , data, i}))
    dispatch(PlayPause(true))

  }
 
  return(
    <div ref={divRef} className='xl:ml-6 ml-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
        <div className='w-full flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
            <Link to='/top-charts'>
              <p className='text-grey-300 text-base cursor-pointer'>See more</p>
            </Link>
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            {topPlays.map((song , i )=> {
               <TopChartCard/>
            })}
          </div>

        </div>
    </div>
  )
}

export default TopPlay