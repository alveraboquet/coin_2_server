import _ from "lodash";
// import moment from "moment";
import { dbconnection } from "../mongodb/init.js";

const apiGetCoin = (req, res) => {
  let body = "";
  req.on("data", function (chunk) {
    console.log(chunk);
    body += chunk;
  });
  req.on("end", function () {
    dbconnection.collection("trade_live").insertOne(_.assign(JSON.parse(body), {time_created: new Date()}), (err, res)=> {
      if(err) throw err
      return res.json(1)
    })
  });
};

export default apiGetCoin;
