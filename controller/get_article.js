import fetch from "node-fetch"
import translate from "translate-google"
// import { client } from "../app.js"

const apiGetArticle= async (request, response_)=> {
    // client.get("article")
    // .then(async res=> {
    //     if(JSON.parse(res)) {
    //         return response_.json(JSON.parse(res))
    //     }
    //     else {
            try {
                const response= await fetch("https://blockchainwhispers.com/api/get-news")
                const body= await response.json()
                let arr= []
                const results= await Promise.all(body?.map(async (item)=> {
                    const res = await translate({...item, image: ""}, {to: 'ko'})
                    return arr.push(res)
                }))
                // client.set("article", JSON.stringify(arr))
                // client.EXPIRE("article", 3600)
                return response_.json(arr)
                
            } catch (error) {
                return console.log(error)
            }
    //     }
    // })
    
}

export default apiGetArticle