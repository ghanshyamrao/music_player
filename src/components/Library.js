import React from "react";

export default function Library({ songs, playSong, currentSongIndex }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Library</h2>
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            onClick={() => playSong(index)}
            className={`p-2 cursor-pointer rounded-lg ${currentSongIndex === index ? "bg-blue-500" : "bg-gray-700"} hover:bg-gray-600`}
          >
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
