import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader, Error } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { isPlaying } = useSelector((state) => state.player);
  const { songData, error, isFetching } = useGetSongDetailsQuery(songid);
  const [songDetails, setSongDetails] = useState(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/get-details',
        params: {
          key: songid,
          locale: 'en-US'
        },
        headers: {
          'X-RapidAPI-Key': '0a505ffe1cmsh1e63e8833d2e129p1a86b6jsnb5a983037da4',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setSongDetails(response.data.sections[1].text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongDetails();
  }, [songid]);

  if (isFetching) {
    return <Loader />; // Display a loading indicator
  }

  if (error) {
    return <Error message={error.message} />; // Display an error message
  }

  if (songDetails) {
    return (
        <div className='flex flex-col'>
          {/* Render your component content here */}
          <h2 className='font-bold text-white items-center' >Lyrics:</h2>
          <p className='text-gray-400'>{songDetails}</p>
        </div>
      );
}

return <p>No data available for this song.</p>; // Handle the case when songData is undefined
  // Now you can safely access songData
  console.log("songData: ", songDetails);

  
}

export default SongDetails;
