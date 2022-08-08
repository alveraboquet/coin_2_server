const apiGetCoin=(req, res)=> {
    console.log(req.body)
    return res.json(JSON.parse(req.body))
}

export default apiGetCoin