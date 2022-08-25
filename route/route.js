import express from "express"
import apiGetArticle from "../controller/get_article.js";
import apiGetCoin from "../controller/get_coin.js";
import get_liquidation from "../controller/get_liquidation.js";
import { apiv2Liquidation } from "../controller/get_liquidation2.js";
import { apiCoinToClient } from "../controller/to_client.js";
import cors from "cors"
import { api_get_quantity } from "../controller/get_quantity.js";
import { initTable } from "../controller/init-table.js";
import get_longshort_and_volume from "../controller/get_longshort_and_volume.js";


const router= express.Router()
router.get("/", (req, res) => {
  res.send("");
});
router.get("/api/v1/get/article", cors(), apiGetArticle);
router.get("/api/v1/get/liquidation", cors(), get_liquidation);
router.get("/api/v2/get/liquidation", cors(), apiv2Liquidation)
router.post("/api/v2/get/get_coin", cors(),apiGetCoin)
router.get("/api/v1/coin/get", cors(),apiCoinToClient)
router.get("/api/v1/get/quantity", cors(), api_get_quantity)
router.get("/api/dit/me/han/xeng",cors() ,initTable)
router.get("/api/dit/me/thang/han/xeng", cors(), get_longshort_and_volume)


export default router