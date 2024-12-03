import React from "react";

export default function DamageDetails({ match, damageDetails, onClose }) {
  if (!damageDetails) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          {match.champion} Match Damage Details
        </h2>
        <h3 className="text-xl font-semibold mb-2">Damage From:</h3>
        <ul className="mb-4">
          {Object.entries(damageDetails.damageFrom).map(([source, damage]) => (
            <li key={source} className="flex justify-between">
              <span>{source}:</span> <span>{damage}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mb-2">Damage To:</h3>
        <ul>
          {Object.entries(damageDetails.damageTo).map(([target, damage]) => (
            <li key={target} className="flex justify-between">
              <span>{target}:</span> <span>{damage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
