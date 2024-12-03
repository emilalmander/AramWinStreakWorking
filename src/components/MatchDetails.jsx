import React from "react";

export default function MatchDetails({ match, damageDetails, onClose }) {
  if (!match || !damageDetails) return null;

  const filteredDamageFrom = Object.entries(damageDetails.damageFrom || {})
    .filter(([source]) => !["Turret", "HA_OrderMinionSiege", "HA_OrderMinionRanged"].includes(source))
    .sort(([, damageA], [, damageB]) => damageB - damageA);

  const filteredDamageTo = Object.entries(damageDetails.damageTo || {})
    .filter(([target]) => !["Turret", "HA_OrderMinionSiege", "HA_OrderMinionRanged"].includes(target))
    .sort(([, damageA], [, damageB]) => damageB - damageA);

  const handleClickOutside = (e) => {
    if (e.target.id === "modalBackground") {
      onClose();
    }
  };

  return (
    <div
      id="modalBackground"
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full relative">
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
        <h3 className="text-xl font-bold text-green-400 mb-4">Damage Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-red-400 mb-2">Damage From:</h4>
            <div className="space-y-2">
              {filteredDamageFrom.map(([source, damage], index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold ">{source}</span>
                  <span className="text-red-400">{damage}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="flex flex-row-reverse text-lg font-bold text-green-400 mb-2">Damage To:</h4>
            <div className="flex-row-reverse space-y-2">
              {filteredDamageTo.map(([target, damage], index) => (
                <div key={index} className="flex flex-row-reverse justify-between">
                  <span className="font-semibold">{target}</span>
                  <span className="text-green-400">{damage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
