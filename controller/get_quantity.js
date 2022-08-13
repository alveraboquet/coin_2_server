import fetch from "node-fetch"
export const api_get_quantity= async (req, res)=> {
    const response= await fetch("https://quantifycrypto.com/api/v1.0/common/landing-grid?currency=USD")
    const result= await response.json() 
    return res.json(result)
}