import React, { useState } from "react";

export default function Playlist({ songs, playSong, currentSongIndex }) {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Playlist</h2>
      <ul className="space-y-2">
        {playlist.length === 0 ? <p>No songs in playlist</p> : null}
        {playlist.map((song, index) => (
          <li
            key={index}
            onClick={() => playSong(songs.indexOf(song))}
            className={`p-2 cursor-pointer rounded-lg ${currentSongIndex === songs.indexOf(song) ? "bg-blue-500" : "bg-gray-700"} hover:bg-gray-600`}
          >
            {song.name}
          </li>
        ))}
      </ul>
      <h3 className="mt-4 text-lg font-semibold">Add to Playlist:</h3>
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li key={index} className="p-2 bg-gray-700 rounded-lg flex justify-between">
            {song.name}
            <button onClick={() => addToPlaylist(song)} className="text-green-400">+</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
