import React from "react";

export default function MatchCard({ match, onClick }) {
  return (
    <div
      onClick={() => onClick(match)} // Skicka matchdata vid klick
      className={`p-6 rounded-lg shadow-lg border cursor-pointer ${
        match.win ? "border-green-500 bg-gray-800" : "border-red-500 bg-gray-900"
      } hover:scale-105 transform transition-all`}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${match.champion}.png`}
          alt={match.champion}
          className="w-16 h-16 rounded-full border-2 border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {match.champion} ({match.win ? "Win" : "Loss"})
          </h2>
          <p className="text-sm text-gray-400">
            KDA: {match.kills}/{match.deaths}/{match.assists}
          </p>
        </div>
      </div>
    </div>
  );
}
