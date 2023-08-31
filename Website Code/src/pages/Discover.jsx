import React from 'react'
import { Error , Loader , SongCard } from "../components";
import {genres} from '../assets/constants'


import { useGetTopChartsQuery } from '../redux/services/shazamCore';
const Discover = () => {

    const {data , isFetching , error} = useGetTopChartsQuery();
    console.log("data is : " + data.tracks[0].layout);
    
    return (
    <div className='flex flex-col'>
      
      <div className="w-full flex justify-between items-center 
      sm:flex-row flex-col mt-4 mb-10" >
        <h2 className='text-white font-bold text-left ' >Discover</h2>
        <select
        onChange={()=>{}}
        value=''
        className='bg-black text-gray-300 outline-none text-sm rounded-lg sm:mt-0 mt-5 '
        > 
        {genres.map((genre) => <option  key ={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>


      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {[1,2,3,4,5,6,7,8,9,10].map((song , i) => (
          <SongCard
            key={song.key}
            song={song}
            i= {i}
          />
         
        ))}
      </div>
    </div>
  )
}

export default Discover

