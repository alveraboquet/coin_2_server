import express from "express"
import apiGetArticle from "../controller/get_article.js";
import apiGetCoin from "../controller/get_coin";
import get_liquidation from "../controller/get_liquidation.js";
import { apiv2Liquidation } from "../controller/get_liquidation2.js";
import { apiCoinToClient } from "../controller/to_client";

const router= express.Router()
router.get("/", (req, res) => {
    res.send("");
  });
router.get("/api/v1/get/article", apiGetArticle);
router.get("/api/v1/get/liquidation", get_liquidation);
router.get("/api/v2/get/liquidation", apiv2Liquidation)
router.post("/api/v2/get/get_coin", apiGetCoin)
router.get("/api/v1/coin/get", apiCoinToClient)

export default router