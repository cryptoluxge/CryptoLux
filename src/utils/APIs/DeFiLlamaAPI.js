import axios from "axios";

//პროტოკოლები
export const getProtocols = async () => {
  const json = await axios(`https://api.llama.fi/protocols`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//პროტოკოლზე ინფო
export const getProtocolWithID = async (id) => {
  const json = await axios(`https://api.llama.fi/protocol/${id}`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//ჩარტი
export const getTotalTVLChart = async (id) => {
  const json = await axios(`https://api.llama.fi/charts`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//ჩარტი
export const getTVLWithID = async (id) => {
  const json = await axios(`https://api.llama.fi/charts/${id}`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//პროტოკოლის TVL
export const getProtocolTVL = async (id) => {
  const json = await axios(`https://api.llama.fi/tvl/${id}`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//ქსელების TVL
export const getChainsTVL = async () => {
  const json = await axios(`https://api.llama.fi/chains`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

//stablecoins list
export const getStablecoins = async () => {
  const json = await axios(`https://stablecoins.llama.fi/peggeds`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};