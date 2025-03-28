import React, { useState } from "react";

export default function Favorites({ songs, playSong, currentSongIndex }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (song) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(song) ? prevFavorites.filter((fav) => fav !== song) : [...prevFavorites, song]
    );
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Favorites</h2>
      {favorites.length === 0 ? <p>No favorite songs yet</p> : null}
      <ul className="space-y-2">
        {favorites.map((song, index) => (
          <li
            key={index}
            onClick={() => playSong(songs.indexOf(song))}
            className={`p-2 cursor-pointer rounded-lg ${currentSongIndex === songs.indexOf(song) ? "bg-blue-500" : "bg-gray-700"} hover:bg-gray-600`}
          >
            {song.name}
            <button onClick={() => toggleFavorite(song)} className="ml-2 text-red-400">★</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
