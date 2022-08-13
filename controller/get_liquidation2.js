import fetch from "node-fetch";

export const apiv2Liquidation = async (req, res) => {
  const arr = [];
  const urls = [
    "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=BTCUSD",
  ];
  Promise.all(urls.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
      arr.push(data);
    })
    .then(() => {
      const dataArray = [];
      arr[0].map((item) => item.data.map((item) => dataArray.push(item)));
      return res.json(dataArray.reverse());
    });
};
