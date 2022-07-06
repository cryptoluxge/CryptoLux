import axios from "axios";

export const getGlobalData = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/global`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

export const getCGTrendingCoins = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/search/trending`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.coins;
};

export const getCGDeFiData = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/global/decentralized_finance_defi`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data;
};

export const getTopCoins = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

export const getSimpleCoinPrice = async (id) => {
  const json = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
    .then((response) => response)
    .catch(() => "error");
  return json.data[(id).toString()].usd;
};