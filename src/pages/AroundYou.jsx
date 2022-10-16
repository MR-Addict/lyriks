import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { availableCountryCode, defaultCountryCode } from '../assets/constants';

const CountryTracks = () => {
  const defaultCountry = 'US';
  const [country, setCountry] = useState(defaultCountry);
  const [loading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  if (isFetching && loading) return <Loader title="Loading Songs Around You..." />;

  if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You</h2>
        <select
          onChange={(e) => setCountry((e.target.value))}
          value={defaultCountryCode}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {availableCountryCode.map((countryCode) => <option key={countryCode} value={countryCode}>{countryCode}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
