import _ from "lodash"

const arr = []
const arr2= []
let arr3= []
const apiGetCoin = (req, res) => {
  let body = "";
  console.log(req.body)
  req.on("data", function (chunk) {
    console.log(chunk)
    body += chunk;
  });
  req.on("end", function () {
    arr.push(body)
    arr?.filter(item=> item?.length > 0).map(item=> arr2?.push(JSON?.parse(item)))
    arr3= _.uniq(arr2, _.isEqual)
  });
  return res.send(arr3)
}

export default apiGetCoin
