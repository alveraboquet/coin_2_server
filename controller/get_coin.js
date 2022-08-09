const arr = [];
const arr2= []
const apiGetCoin = (req, res) => {
  var body = "";
  console.log(req.body)
  req.on("data", function (chunk) {
    console.log(chunk)
    body += chunk;
  });
  req.on("end", function () {
    arr.push(body)
  });
  arr.filter(item=> item.length > 0).map(item=> arr2.push(JSON.parse(item)))
  return res.send(arr2);
};

export default apiGetCoin;
