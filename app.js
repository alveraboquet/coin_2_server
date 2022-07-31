import { streamNormalized, normalizeLiquidations, combine } from "tardis-dev";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import fetch from "node-fetch"
import apiGetArticle from "./controller/get_article.js";
import redis from "redis"

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// export const client= redis.createClient()
// await client.connect()

const monitoredExchanges = [
  { id: "ftx", symbols: ["BTC-PERP"] },
  { id: "bitmex", symbols: ["XBTUSD"] },
  { id: "deribit", symbols: ["BTC-PERPETUAL"] },
  { id: "binance-futures", symbols: ["BTCUSDT"] },
  { id: "binance-delivery", symbols: ["BTCUSD_PERP"] },
  { id: "bitfinex-derivatives", symbols: ["BTCF0:USTF0"] },
  { id: "cryptofacilities", symbols: ["PI_XBTUSD"] },
  { id: "huobi-dm-swap", symbols: ["BTC-USD"] },
  { id: "ftx", symbols: ["BTC-PERP"] },
  { id: "bitmex", symbols: ["XBTUSD"] },
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
    formatLiquidation(liquidation);
  }
}

const meta = {
  ftx: {
    name: "FTX",
    contractMultiplier: 1,
    inverse: true,
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
    name: "Binance USDT Futures",
    contractMultiplier: 1,
    inverse: true,
  },
  "binance-delivery": {
    name: "Binance COIN Futures",
    contractMultiplier: 1,
    inverse: true,
  },
  "bitfinex-derivatives": {
    name: "Bitfinex Derivatives",
    contractMultiplier: 1,
    inverse: true,
  },
  cryptofacilities: {
    name: "Kraken Futures",
    contractMultiplier: 1,
    inverse: true,
  },
  "huobi-dm-swap": {
    name: "Huobi Swap",
    contractMultiplier: 100,
    inverse: true,
  },
};

const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
let arr = [];

function formatLiquidation(liquidation) {
  const { name, contractMultiplier, inverse } = meta[liquidation.exchange];
  const position = liquidation.side === "sell" ? "long" : "short";
  const price = usdCurrencyFormatter.format(liquidation.price);
  let normalizedAmount = liquidation.amount * contractMultiplier;
  if (inverse === false) {
    normalizedAmount = normalizedAmount * liquidation.price;
  }
  const minSize = 10000;
  if (normalizedAmount < minSize) {
    return;
  }
  const liquidatedAmunt = usdCurrencyFormatter.format(normalizedAmount);
  const timestamp = liquidation.timestamp.toISOString();
  const direction = liquidation.side === "sell" ? "📉" : "📈";
  console.log(
    `${direction} ${name} liquidated ${position} ${liquidation.symbol} position` +
      ` at ${price}: ${liquidation.side} ${liquidatedAmunt}, timestmap: ${timestamp}`
  );
  arr.push(
    `${direction} ${name} liquidated ${position} ${liquidation.symbol} position` +
      ` at ${price}: ${liquidation.side} ${liquidatedAmunt}, timestmap: ${timestamp}`
  );
}
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/get/article", apiGetArticle)
server.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});
monitorLiquidations();

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("get_data", (data) => {
    setInterval(() => {
      socket.emit("return_data", arr);
    }, 1000);
  });
});
