
const arr= []
const apiGetCoin=(req, res)=> {
    var body = "";
   req.on('data', function (chunk) {
     body += chunk;
   });
   req.on('end', function () {
     console.log('body: ' + body);
     var jsonObj = JSON.parse(body);
   console.log(jsonObj.test);
   })
     res.end('Hello, World!');
    return res.send(JSON.stringify(req.body))
}

export default apiGetCoin