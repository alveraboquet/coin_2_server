import { dbconnection } from "../mongodb/init.js"

export const apiCoinToClient= (req, res)=> {
    dbconnection.collection("trade_live").find().sort({timeNumber: -1}).limit(50).toArray((err, docs)=> {
        if(err) {
            throw err
        }
        return res.json(docs)
    })
}