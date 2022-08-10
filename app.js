import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongo from "./mongodb/init.js";
import router from "./route/route.js";
// import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: "*"
// })

app.use(cors({
  origin: "*"
}));
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.raw());
app.use(bodyParser.json({limit: 1024 * 1024}))
// export const client= redis.createClient()
// await client.connect()
// io.on("connection", socket=> {
//   console.log(socket.id)
  
//   socket.on("get_data_from_client", (data)=> {
//     setInterval( ()=> {
//       socket.emit("return_data_from_server", 1)
//     }, 1000)
//   })
// })
connectMongo()
app.use(router)

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
