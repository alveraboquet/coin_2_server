import _ from "lodash"
import moment from "moment"

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
    arr?.filter(item=> item?.length > 0).map(item=> {
      console.log(JSON.parse(item))
      const obj= JSON.parse(item)
      ojb.time_created= moment(new Date()).valueOf()
      return arr2?.push(obj)
    })
  });
  return res.send(_.uniqWith(arr2, _.isEqual).slice(0, 50).reverse())
}

export default apiGetCoin
