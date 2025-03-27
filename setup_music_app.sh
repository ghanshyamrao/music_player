#!/bin/bash

# Define project name
PROJECT_NAME="music-app"

# Step 1: Create a new React app
echo "Creating React app..."
npx create-react-app $PROJECT_NAME --use-npm

# Step 2: Navigate into the project
cd $PROJECT_NAME

# Step 3: Install required dependencies
echo "Installing dependencies..."
npm install react-icons tailwindcss

# Step 4: Set up Tailwind CSS
npx tailwindcss init -p

# Step 5: Configure Tailwind (Add config)
echo 'module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};' > tailwind.config.js

# Step 6: Add Tailwind to CSS
echo '@tailwind base;
@tailwind components;
@tailwind utilities;' > src/index.css

# Step 7: Create the Music Player component
mkdir -p src/components

cat <<EOL > src/components/MusicPlayer.js
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
            className={\`cursor-pointer hover:bg-gray-200 p-2 rounded \${index === currentSongIndex ? "bg-blue-300" : ""}\`}
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
EOL

# Step 8: Update App.js
echo 'import React from "react";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <MusicPlayer />
    </div>
  );
}' > src/App.js

# Step 9: Run the app
echo "Setup complete. Running the application..."
npm start
