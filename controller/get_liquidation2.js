import fetch from "node-fetch"

export const apiv2Liquidation= async (req, res)=> {
    const response= await fetch(`http://api.xypher.io/v1/liquidations?key=${process.env.KEY_API || "YYWrcW1vvM9aXfevuOmTq4oWeEOOWKfc"}&exchange=bybit&start_date=${Math.floor(new Date().getTime() / 1000)}`)
    const data= await response.json()
    return res.json(data.data)
}