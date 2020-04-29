var md5 = require("./md5.js");
let axios = require('axios');

function makeParams(params){
  var jsonStr = JSON.stringify(params)
  var time = "201711141642"
  var salt = "gn1002015"
  var keyStr = jsonStr + time + salt
  let key = md5.hexMD5(md5.hexMD5(keyStr))
  var result = {
      "u":"p", 
      "version":"1.0", 
      "time":time, 
      "params":params, 
      "key":key
    }
  return result;
}

function interfaceRequest(type,url, params, callback){
  var postData = JSON.stringify(makeParams(params))
  axios({
    method: type,
    url: url,
    data: postData
  })
  .then(function (res) {
    callback(res.data)
  })
  .catch(function (error) {
      console.log(error)
  });
  console.log(postData)
}


module.exports = {
  interfaceRequest: interfaceRequest
}
