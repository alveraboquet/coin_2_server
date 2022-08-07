import fetch from "node-fetch";

export const apiv2Liquidation = async (req, res) => {
  const arr = [];
  const urls = [
    "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=BTCUSD",
    // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=2",
    // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=3",
    // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=4",
    // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=5",
  ];
  Promise.all(urls.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
        arr.push(data)
    })
    .then(()=>{
        const dataArray= []
        arr[0].map(item=> (item.data.map(item=> dataArray.push(item))))

        return res.json(dataArray.reverse())
    })
  // const url2= "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=binance&market=BTCUSD_PERP "
  // const url3= "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=binance&market=ETHUSD_PERP"
  // const pr1= await fetch(url1)
  // const pr2= await fetch(url2)
  // const pr3= await fetch(url3)
  // const body1= await pr1.json()
  // const body2= await pr2.json()
  // const body3= await pr3.json()
  // return res.json(body1?.data)
};
