import axios from "axios";
import moment from "moment";

export const getVCsData = async () => {
  const json = await axios(`https://api.cryptorank.io/v0/coin-funds?withSummary=true`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data;
};

export const getVCData = async (slug) => {
  const json = await axios(`https://api.cryptorank.io/v0/coin-funds/by-slug/${slug}`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data;
};

export const getVCInvestments = async (vcId) => {
  const json = await axios(`https://api.cryptorank.io/v0/coins?fundIds=${vcId}`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data;
};

export const getMostSearched = async () => {
  const today = moment().subtract(1, 'days').format('YYYY-MM-DD')
  const json = await axios(`https://api.cryptorank.io/v0/coins/trending/by-views?dateFrom=${today}&limit=10&locale=en`)
    .then((response) => response)
    .catch(() => "error");
  return json.data.data;
};