import Xray from "x-ray";
var x = Xray();

const get_longshort_and_volume = async (req, res) => {
  x("https://blockchainwhispers.com/bitmex-position-calculator", {
    long_percent: [".card-longs-percents"],
    long_volume: [".card-longs-value"],
    short_volume: [".card-shorts-value"],
    short_percent: [".card-shorts-percents"]
  })(function (err, data) {
    res.json(data);
  });
};

export default get_longshort_and_volume;
