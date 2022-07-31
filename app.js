import express from "express";
import http from "http";
import cors from "cors";
import apiGetArticle from "./controller/get_article.js";
import get_liquidation from "./controller/get_liquidation.js";

const app = express();

app.use(cors());
const server = http.createServer(app);
// export const client= redis.createClient()
// await client.connect()

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/get/article", apiGetArticle);
app.get("/api/v1/get/liquidation", get_liquidation);
server.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});
