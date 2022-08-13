import fetch from "node-fetch";

export const initTable = async (req, res) => {
  const query_fields = {
    query_fields: [
      "rank",
      "symbol_name", //
      "price_usd", //
      "support1h", //
      "resistance1h", //
      "price24h",
    ],
  };
  const response = await fetch(
    `https://quantifycrypto.com/api/v1.0/common/init-table?currency=USD`,
    { method: "POST", body: JSON.stringify(query_fields), headers: {'Content-Type': 'application/json'} }
  );
  const result= await response.json()
  return res.json(result)
};
