import axios from "axios";

export const getWallet = async (address) => {
  const json = await axios(`https://pool.pm/wallet/${address}`)
    .then((response) => response)
    .catch((x) => {
      if (x.response.data.error === "404 Not Found: invalid receive address") {
        return 'invalid address'
      } else if (String(x.response.data.error).includes("404 Not Found: stake address")) {
        return 'no balance'
      } else {
        return 'try again'
      }
    });
  return json;
};