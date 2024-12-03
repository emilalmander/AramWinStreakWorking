

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const API_KEY = "RGAPI-727b494a-d55a-4461-88c7-b9b90fdbe12d";
const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Tillåt frontend att ansluta

// Hämta kontoinformation
app.get("/account/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;
  console.log(`Fetching account info for: ${gameName}#${tagLine}`);
  try {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.status?.message || "Unknown error";
    console.error(`Error fetching account info: ${message} (status: ${status})`);
    res.status(status).json({ error: message });
  }
});

// Hämta matchhistorik
app.get("/match-history/:puuid", async (req, res) => {
  const { puuid } = req.params;
  const { start = 0, count = 10 } = req.query;
  console.log(`Fetching match history: Start=${start}, Count=${count}`);
  try {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`;
    const response = await axios.get(url);
    console.log("Match IDs fetched:", response.data); // Logga match-IDs
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching match history:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


// Hämta matchdetaljer
app.get("/match-details/:matchId", async (req, res) => {
  const { matchId } = req.params;
  try {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.response?.data?.status?.message || "Unknown error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


