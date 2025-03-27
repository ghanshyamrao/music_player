import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from "react-icons/fa";

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const songList = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setSongs(songList);
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = songs[index].url;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (currentSongIndex === null) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Music Player</h1>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="mt-2"
      />

      <ul className="mt-4">
        {songs.map((song, index) => (
          <li
            key={index}
            className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${index === currentSongIndex ? "bg-blue-300" : ""}`}
            onClick={() => playSong(index)}
          >
            {song.name}
          </li>
        ))}
      </ul>

      {currentSongIndex !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Now Playing: {songs[currentSongIndex].name}</h2>
          <div className="flex gap-4 mt-2">
            <button onClick={playPrevious} className="p-2 bg-gray-500 text-white rounded">
              <FaStepBackward />
            </button>
            <button onClick={togglePlayPause} className="p-2 bg-blue-500 text-white rounded">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={playNext} className="p-2 bg-gray-500 text-white rounded">
              <FaStepForward />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          <audio ref={audioRef} onEnded={playNext}></audio>
        </div>
      )}
    </div>
  );
}
