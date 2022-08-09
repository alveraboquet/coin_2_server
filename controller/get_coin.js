const arr = [];
const apiGetCoin = (req, res) => {
  var body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });
  req.on("end", function () {
    arr.push(JSON.parse(body))
    console.log("body: " + JSON.parse(body));
  });
  return res.send(arr);
};

export default apiGetCoin;
