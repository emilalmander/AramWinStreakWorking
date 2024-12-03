export const calculateAverageStats = (matches) => {
    if (matches.length === 0) return null;
  
    const totalStats = matches.reduce(
      (totals, match) => {
        totals.kills += match.kills;
        totals.deaths += match.deaths;
        totals.assists += match.assists;
        totals.damageDealt += match.damageDealt;
        totals.damageTaken += match.damageTaken;
        return totals;
      },
      { kills: 0, deaths: 0, assists: 0, damageDealt: 0, damageTaken: 0 }
    );
  
    const count = matches.length;
    return {
      kills: (totalStats.kills / count).toFixed(1),
      deaths: (totalStats.deaths / count).toFixed(1),
      assists: (totalStats.assists / count).toFixed(1),
      damageDealt: Math.round(totalStats.damageDealt / count),
      damageTaken: Math.round(totalStats.damageTaken / count),
    };
  };
  