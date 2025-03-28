import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaHeart, FaMusic, FaBars } from "react-icons/fa";
import Library from "./Library";
import Favorites from "./Favorites";
import Playlist from "./Playlist";

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [activeTab, setActiveTab] = useState("trending");
  const audioRef = useRef(null);

  // Load music files from local storage
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const songList = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setSongs(songList);
  };

  // Play selected song
  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = songs[index].url;
      audioRef.current.play();
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (currentSongIndex === null) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play next song
  const playNext = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    }
  };

  // Play previous song
  const playPrevious = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    }
  };

  // Adjust volume
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Music Player</h1>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="mb-4 bg-gray-800 text-white p-2 rounded hidden"
      />
      <div className="w-full max-w-md bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setActiveTab("trending")} className={`${activeTab === "trending" ? "text-blue-400" : "text-gray-400"} text-xl`}>
            <FaMusic />
          </button>
          <button onClick={() => setActiveTab("favorites")} className={`${activeTab === "favorites" ? "text-red-400" : "text-gray-400"} text-xl`}>
            <FaHeart />
          </button>
          <button onClick={() => setActiveTab("playlist")} className={`${activeTab === "playlist" ? "text-green-400" : "text-gray-400"} text-xl`}>
            <FaBars />
          </button>
        </div>

        {activeTab === "trending" && <Library songs={songs} playSong={playSong} currentSongIndex={currentSongIndex} />}
        {activeTab === "favorites" && <Favorites songs={songs} playSong={playSong} currentSongIndex={currentSongIndex} />}
        {activeTab === "playlist" && <Playlist songs={songs} playSong={playSong} currentSongIndex={currentSongIndex} />}

        {currentSongIndex !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold">Now Playing: {songs[currentSongIndex].name}</h2>
            <div className="flex items-center justify-center gap-6 mt-4">
              <button onClick={playPrevious} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full">
                <FaStepBackward size={20} />
              </button>
              <button onClick={togglePlayPause} className="p-4 bg-blue-500 hover:bg-blue-400 rounded-full">
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button onClick={playNext} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full">
                <FaStepForward size={20} />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <FaVolumeUp size={20} />
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
    </div>
  );
}