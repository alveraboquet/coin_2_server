import fetch from "node-fetch";
import translate from "translate-google";
// import { client } from "../app.js"

const apiGetArticle = async (request, response_) => {
  // client.get("article")
  // .then(async res=> {
  //     if(JSON.parse(res)) {
  //         return response_.json(JSON.parse(res))
  //     }
  //     else {
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
      // client.set("article", JSON.stringify(arr))
      // client.EXPIRE("article", 3600)
      .then(() => {
        return response_.json(arr);
      })
      .catch((err) => {
        return response_.json([])
      });
  } catch (error) {
    return response_.json([])
  }
  //     }
  // })
};

export default apiGetArticle;
