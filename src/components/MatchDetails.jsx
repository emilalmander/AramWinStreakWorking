import React from "react";

export default function MatchDetails({ match, onClose }) {
  if (!match) return null; // Om ingen match är vald, visa inget

  const handleClickOutside = (e) => {
    if (e.target.id === "modalBackground") {
      onClose(); // Stäng modalen om man klickar utanför
    }
  };

  return (
    <div
      id="modalBackground"
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          {match.champion} Match Details
        </h2>
        <p className="text-sm text-gray-400 mb-2">
          KDA: {match.kills}/{match.deaths}/{match.assists}
        </p>
        <p className="mb-2">
          <span className="font-bold text-green-400">Damage Dealt:</span>{" "}
          {match.damageDealt}
        </p>
        <p className="mb-4">
          <span className="font-bold text-red-400">Damage Taken:</span>{" "}
          {match.damageTaken}
        </p>

        {/* Exempel: Visa vilken damage som tagits från champions */}
        <h3 className="text-xl font-bold text-green-400 mt-4 mb-2">Damage Details</h3>
        <div>
          <p>
            <span className="font-bold">Damage From:</span>
          </p>
          <ul className="list-disc list-inside text-gray-300">
            {Object.entries(match.damageFrom || {}).map(([champ, damage], index) => (
              <li key={index}>
                {champ}: {damage}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="font-bold">Damage To:</span>
          </p>
          <ul className="list-disc list-inside text-gray-300">
            {Object.entries(match.damageTo || {}).map(([champ, damage], index) => (
              <li key={index}>
                {champ}: {damage}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
