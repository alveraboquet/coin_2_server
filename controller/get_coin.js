const apiGetCoin=(req, res)=> {
    console.log(req)
    return res.send(JSON.stringify(req.body))
}

export default apiGetCoin