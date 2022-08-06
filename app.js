import express from "express";
import http from "http";
import cors from "cors";
import apiGetArticle from "./controller/get_article.js";
import get_liquidation from "./controller/get_liquidation.js";
import { apiv2Liquidation } from "./controller/get_liquidation2.js";
import { Server } from "socket.io"
import fetch from "node-fetch"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*"
})

app.use(cors());
// export const client= redis.createClient()
// await client.connect()
io.on("connection", socket=> {
  console.log(socket.id)
  const getApi= async()=> {
    const response= await fetch(`http://api.xypher.io/v1/liquidations?key=${process.env.KEY_API || "YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc"}&exchange=bybit&start_date=${Math.floor(new Date().getTime() / 1000)}`)
    const data= await response.json()
    return data.data
  }
  socket.on("get_data_from_client", ()=> {
    setInterval(()=> {
      socket.emit("return_data_from_server", {a: getApi()})
    }, 2000)
  })
})

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/get/article", apiGetArticle);
app.get("/api/v1/get/liquidation", get_liquidation);
app.get("/api/v2/get/liquidation", apiv2Liquidation)
server.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});
