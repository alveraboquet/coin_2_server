const arr = [];
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
  return res.send(arr);
};

export default apiGetCoin;
