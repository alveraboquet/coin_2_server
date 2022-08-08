
const arr= []
const apiGetCoin=(req, res)=> {
    console.log(req)
    arr.push(req.body)
    console.log(arr)
    return res.send(JSON.stringify(req.body))
}

export default apiGetCoin