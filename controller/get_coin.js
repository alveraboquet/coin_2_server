const arr = [];
const apiGetCoin = (req, res) => {
  var body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });
  req.on("end", function () {
    console.log("body: " + JSON.parse(body));
  });
  return res.send("Hello Wolrd");
};

export default apiGetCoin;
