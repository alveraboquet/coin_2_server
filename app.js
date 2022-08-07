import express from "express";
import http from "http";
import cors from "cors";
import apiGetArticle from "./controller/get_article.js";
import get_liquidation from "./controller/get_liquidation.js";
import { apiv2Liquidation } from "./controller/get_liquidation2.js";
import { Server } from "socket.io"

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
  
  socket.on("get_data_from_client", (data)=> {
    setInterval( ()=> {
      socket.emit("return_data_from_server", 1)
    }, 1000)
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
