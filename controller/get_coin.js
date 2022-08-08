const apiGetCoin=(req, res)=> {
    console.log(req.body)
    return res.send(JSON.stringify(req.body))
}

export default apiGetCoin