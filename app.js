import express from "express";
import http from "http";
import cors from "cors";
import apiGetArticle from "./controller/get_article.js";
import get_liquidation from "./controller/get_liquidation.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "https://datistpham27.github.io/coin_2/");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  })
const server = http.createServer(app);
// export const client= redis.createClient()
// await client.connect()


app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/get/article", apiGetArticle)
server.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});
app.get("/api/v1/get/liquidation", get_liquidation)
