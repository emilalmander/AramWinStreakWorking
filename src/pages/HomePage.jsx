import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MatchCard from "../components/MatchCard";
import MatchDetails from "../components/MatchDetails";
import StatsSummary from "../components/StatsSummary";
import { getAccountInfo, getMatchHistory, getMatchDetails, getMatchTimeline, processDamageDetails } from "../utils/riotApi";
import { calculateAverageStats } from "../utils/statistics";

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [averageStats, setAverageStats] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null); // För vald match
  const [damageDetails, setDamageDetails] = useState(null); // För skadedetaljer
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("default"); // Standard sorteringsalternativ
  const [winStreak, setWinStreak] = useState(0); // Lägg till win streak
  // Hämta och bearbeta matchdata

  const calculateWinStreak = (matches) => {
    let streak = 0;
    for (const match of matches) {
      if (match.win) {
        streak++;
      } else {
        break; // Stoppa om vi stöter på en förlust
      }
    }
    return streak;
  };
  const handleSearch = async (gameName, tagLine) => {
    try {
      setError("");
      const accountInfo = await getAccountInfo(gameName, tagLine);
      const puuid = accountInfo.puuid;

      let aramMatches = [];
      let start = 0;

      // Hämta tills vi har exakt 15 ARAM-matcher
      while (aramMatches.length < 15) {
        const matchHistory = await getMatchHistory(puuid, start, 10);
        if (matchHistory.length === 0) break;

        for (const matchId of matchHistory) {
          const matchDetails = await getMatchDetails(matchId);

          if (matchDetails.info.queueId === 450) {
            const participant = matchDetails.info.participants.find(
              (p) => p.puuid === puuid
            );

            if (participant) {
              aramMatches.push({
                champion: participant.championName,
                kills: participant.kills,
                deaths: participant.deaths,
                assists: participant.assists,
                win: participant.win,
                damageDealt: participant.totalDamageDealtToChampions,
                damageTaken: participant.totalDamageTaken,
                matchId, // Lägg till matchId
                participantId: participant.participantId, // Lägg till participantId
              });
            }
          }

          if (aramMatches.length >= 15) break;
        }

        start += 10; // Nästa batch
      }

      setMatches(aramMatches);
      setAverageStats(calculateAverageStats(aramMatches));
      setWinStreak(calculateWinStreak(aramMatches)); // Uppdatera win streak
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Failed to fetch data. Please check your input.");
    }
  };

  // Sortera matcher baserat på valt alternativ
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    const sortedMatches = [...matches].sort((a, b) => {
      if (sortValue === "dealt") return b.damageDealt - a.damageDealt;
      if (sortValue === "taken") return b.damageTaken - a.damageTaken;
      if (sortValue === "kills") return b.kills - a.kills;
      if (sortValue === "deaths") return a.deaths - b.deaths; // Lägre deaths är bättre
      if (sortValue === "assists") return b.assists - a.assists;
      return 0; // Ingen sortering för default
    });

    setMatches(sortedMatches);
  };

  // Hantera klick på en match och hämta skadedetaljer
  const handleMatchClick = async (match) => {
    setSelectedMatch(match);
    try {
      const timeline = await getMatchTimeline(match.matchId);
      const details = processDamageDetails(timeline, match.participantId);
      setDamageDetails(details);
    } catch (err) {
      console.error("Error fetching damage details:", err.message);
      setDamageDetails(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      <header className="text-center my-6">
        <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
          ARAM Match Tracker
        </h1>
      </header>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <StatsSummary averageStats={averageStats} />
      <div className="my-4">
        <p className="text-lg font-bold text-green-400">
          Current Win Streak: <span className="text-white">{winStreak}</span>
        </p>
      </div>
      <div className="mb-6">
        <label htmlFor="sortOption" className="text-lg font-semibold mr-4">
          Sort By:
        </label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        >
          <option value="default">Default</option>
          <option value="dealt">Damage Dealt</option>
          <option value="taken">Damage Taken</option>
          <option value="kills">Kills</option>
          <option value="deaths">Deaths</option>
          <option value="assists">Assists</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            match={match}
            onClick={() => handleMatchClick(match)} // Skicka vald match till hantering
          />
        ))}
      </div>
      {selectedMatch && damageDetails && (
        <MatchDetails
          match={selectedMatch}
          damageDetails={damageDetails} // Skicka skadedetaljer till modalen
          onClose={() => setSelectedMatch(null)} // Stäng modalen
        />
      )}
    </div>
  );
}
