import { streamNormalized, normalizeLiquidations, combine } from "tardis-dev";
// import fetch from "node-fetch"

let arr = [];
// let's monitor BTC perpetuals swaps only
const monitoredExchanges = [
  { id: "ftx", symbols: ["BTC-PERP", "ETH-PERP"] },
  { id: "bitmex", symbols: ["XBTUSD", "ETHTUSD"] },
  { id: "deribit", symbols: ["BTC-PERPETUAL", "ETH-PERPETUAL"] },
  { id: "binance-futures", symbols: ["BTCUSDT", "ETHUSDT"] },
  { id: "binance-futures", symbols: ["BTCUSD_PERP", "ETHUSD_PERP"] },
  { id: "bitfinex-derivatives", symbols: ["BTCF0:USTF0", "ETHF0:USTF0"] },
  { id: "cryptofacilities", symbols: ["PI_XBTUSD", "PI_ETHUSD"] },
  { id: "huobi-dm-swap", symbols: ["BTC-USD", "ETH-USD"] },
  // { id: "bybit", symbols: ["BTCUSD", "ETHUSD", "BTCUSDT", "ETHUSDT"] },
];

async function monitorLiquidations() {
  const monitoredExchangesLiquidationsStreams = monitoredExchanges.map(
    (exchange) => {
      return streamNormalized(
        {
          exchange: exchange.id,
          symbols: exchange.symbols,
          timeoutIntervalMS: 30 * 60 * 1000,
        },
        normalizeLiquidations
      );
    }
  );

  const combinedLiquidationStream = combine(
    ...monitoredExchangesLiquidationsStreams
  );

  console.log("Liquidations monitor started...");

  for await (const liquidation of combinedLiquidationStream) {
    console.log(formatLiquidation(liquidation));
  }
}

const meta = {
  ftx: {
    name: "FTX",
    contractMultiplier: 1,
    inverse: false,
  },
  bitmex: {
    name: "BitMEX",
    contractMultiplier: 1,
    inverse: true,
  },
  deribit: {
    name: "Deribit",
    contractMultiplier: 1,
    inverse: true,
  },
  "binance-futures": {
    name: "Binance",
    contractMultiplier: 1,
    inverse: false,
  },
  "binance-delivery": {
    name: "Binance",
    contractMultiplier: 1,
    inverse: true,
  },
  "bitfinex-derivatives": {
    name: "Bitfinex",
    contractMultiplier: 1,
    inverse: false,
  },
  cryptofacilities: {
    name: "Kraken",
    contractMultiplier: 1,
    inverse: true,
  },
  "huobi-dm-swap": {
    name: "Huobi",
    contractMultiplier: 100,
    inverse: true,
  },
  bybit: {
    name: "Bybit",
    contractMultiplier: 100,
    inverse: true,
  },
};

const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatLiquidation(liquidation) {
  const { name, contractMultiplier, inverse } = meta[liquidation.exchange];
  const position = liquidation.side === "sell" ? "long" : "short";
  const price = usdCurrencyFormatter.format(liquidation.price);
  let normalizedAmount = liquidation.amount * contractMultiplier;
  if (inverse === false) {
    normalizedAmount = normalizedAmount * liquidation.price;
  }
  const liquidatedAmunt = usdCurrencyFormatter.format(normalizedAmount);
  const timestamp = liquidation.timestamp.toISOString();
  const direction = liquidation.side === "sell" ? "long" : "short";
  console.log({
    direction,
    name,
    position,
    symbol: liquidation.symbol,
    price,
    side: liquidation.side,
    liquidatedAmunt,
    timestamp,
    exchange: name,
    market: liquidation.symbol,
    side: direction,
    unixtime: timestamp,
    rate: price,
    x: liquidation,
  });
  return arr.push({
    direction,
    name,
    position,
    symbol: liquidation.symbol,
    price,
    side: liquidation.side,
    liquidatedAmunt,
    timestamp,
    exchange: name,
    market: liquidation.symbol,
    side: direction,
    unixtime: timestamp,
    rate: price,
    x: liquidation,
  });
}

monitorLiquidations();
const get_liquidation = async (req, res) => {
  // const arr1 = [];
  // const dataArray= [];
  // const urls = [
  //   "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=BTCUSD",
  //   "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=ETHUSD",
  //   "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=BTCUSDT",
  //   "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&exchange=bybit&market=ETHUSDT",
  //   // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=2",
  //   // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=3",
  //   // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=4",
  //   // "https://api.xypher.io/v1/liquidations?key=YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc&page=5",
  // ];
  // Promise.all(urls.map((u) => fetch(u)))
  //   .then((responses) => Promise.all(responses.map((res) => res.json())))
  //   .then((data) => {
  //     arr1.push(data)
  //   })
  //   .then(()=>{
  //     arr1[0].map(item=> (item.data.map(item=> dataArray.push(item))))
  //     return res.json(arr.concat(dataArray));
  //   })
  return res.json(arr)
  
};

export default get_liquidation;
