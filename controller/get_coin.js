import _ from "lodash"

const arr = []
const arr2= []
const apiGetCoin = (req, res) => {
  let body = "";
  req.on("data", function (chunk) {
    console.log(chunk)
    body += chunk;
  });
  req.on("end", function () {
    arr.push(body)
    arr?.filter(item=> item?.length > 0).map(item=> arr2?.push(JSON?.parse(item)))
  });
  return res.send(_.uniqWith(arr2, _.isEqual).slice(0, 50).reverse())
}

export default apiGetCoin
