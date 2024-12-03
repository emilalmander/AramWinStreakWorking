import React from "react";

export default function StatsSummary({ averageStats }) {
  if (!averageStats) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Average Stats</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <p>Kills: <span className="text-green-400 font-bold">{averageStats.kills}</span></p>
        <p>Deaths: <span className="text-red-400 font-bold">{averageStats.deaths}</span></p>
        <p>Assists: <span className="text-blue-400 font-bold">{averageStats.assists}</span></p>
        <p>Damage Dealt: <span className="text-green-400 font-bold">{averageStats.damageDealt}</span></p>
        <p>Damage Taken: <span className="text-red-400 font-bold">{averageStats.damageTaken}</span></p>
      </div>
    </div>
  );
}
