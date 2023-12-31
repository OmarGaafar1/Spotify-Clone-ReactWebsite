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


const TopChartCard = ({ song, i  , isPlaying , activeSong , handlePauseClick , handlePlayClick}) => {
  return (
    <div className='w-full  flex flex-row items-center hover:bg-[#4C426e] py-2 p-4 rounded-lg cursor-pointer mb-2 gap-2'>
      <h3 className='font-bold text-base text-white mr-3'>{i+1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">
            {song?.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause 
    handlePauseClick= {handlePauseClick}
    handlePlayClick= {() => handlePlayClick(song ,i)}
    song={song}
    isPlaying ={isPlaying}
    activeSong= {activeSong}
    />
    </div>
  );
};



const TopPlay = () => {
  const dispatch = useDispatch();
  const{activeSong , isPlaying} = useSelector((state)=> state.player)
  const {data , isFetching , isError } = useGetTopChartsQuery();
  const divRef = useRef(null);
  
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  const handlePauseClick =() => {
    dispatch(PlayPause(false))
    
  }
  
  
  const handlePlayClick =(song , i) => {
    dispatch(setActiveSong({song , data, i}))
    dispatch(PlayPause(true))
    
  }
  if (isFetching) {
    return <p>Loading...</p>; // Handle loading state
  }
  
  if (isError) {
    return <p>Error fetching data.</p>; // Handle error state
  }
  
  const topPlays   = data.tracks?.slice(12,15);
  const topArtists = data;
  console.log("data is : " + topArtists.tracks[0].title);
 
  return(
    <div ref={divRef}  className='xl:ml-6 ml-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
        <div className='w-full flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
            <Link to='/top-charts'>
              <p className='text-grey-300 text-base cursor-pointer'>See more</p>
            </Link>
          </div>
          <div className='mt-4 flex flex-col gap-1 '>
            {topPlays.map((song , i )=> {

              return(
               <TopChartCard  key={song.key} song={song} i={i} 
               isPlaying ={isPlaying}
               activeSong={activeSong}
               handlePauseClick={handlePauseClick}
               handlePlayClick={handlePlayClick}/>
            )})}
          </div>
        </div>
        <div>

            <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

                <Swiper slidesPerView='auto' spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]}
                className='mt-4'>
                  {topArtists.tracks.map(( song, i ) => {
                    console.log("now song is " + topArtists.tracks.length);

                    return(
                    <SwiperSlide key={song?.key} style={{ width: '25%', height: 'auto' }} className='shadow-lg rounded-full animate-slideright'>
                      <Link to={`/artist/${song?.artists[0].adamid}`}>
                        <img  className='w-full rounded-full object-cover' src={song.images.background} />
                      </Link>
                    </SwiperSlide>
                    )})}
                </Swiper>
          </div>
        </div>
    </div>
  )
}

export default TopPlay