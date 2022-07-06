import axios from "axios";

export const getCMCTrendingCoins = async () => {
  const json = await axios(`https://api.coinmarketcap.com/data-api/v3/topsearch/rank`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data.cryptoTopSearchRanks;
};