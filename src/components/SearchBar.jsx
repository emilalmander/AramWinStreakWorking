import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSearch = () => {
    if (gameName.trim() && tagLine.trim()) {
      onSearch(gameName.trim(), tagLine.trim());
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter game name (e.g., papavako)"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        className="p-4 border border-gray-600 rounded-md w-80 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Enter tag line (e.g., EUW)"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
        className="p-4 border border-gray-600 rounded-md w-80 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all"
      >
        Search
      </button>
    </div>
  );
}
