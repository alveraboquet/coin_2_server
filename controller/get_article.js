import fetch from "node-fetch";
import translate from "translate-google";
// import { client } from "../app.js"

const apiGetArticle = async (request, response_) => {
  let arr = [];
  try {
    const response = await fetch("https://blockchainwhispers.com/api/get-news");
    const body = await response.json();
    await Promise.all(
      body?.map(async (item) => {
        const res = await translate({ ...item, image: "" }, { to: "ko" })
        return arr.push(res);
      })
    )
      .then(() => {
        return response_.json(arr);
      })
      .catch((err) => {
        return response_.json(arr)
      });
  } catch (error) {
    return response_.json(arr)
  }
};

export default apiGetArticle;
