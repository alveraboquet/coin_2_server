import _ from "lodash";
import moment from "moment";

const arr = [];
const arr2 = [];
const apiGetCoin = (req, res) => {
  let body = "";
  req.on("data", function (chunk) {
    console.log(chunk);
    body += chunk;

  });
  req.on("end", function () {
    arr.push(body);
    arr
      ?.filter((item) => item?.length > 0)
      .map((item) => {
        return arr2.push(_.assign(JSON.parse(item), {time_created: new Date()}))
      });
  });
  return res.send(
    _.orderBy(_.uniqWith(arr2, _.isEqual), "time_created", "desc").slice(0, 50)
  );
};

export default apiGetCoin;
