const { json } = require('express')
const express = require('express')
const myRedis = require("redis")
var crypto = require('crypto');
const app = express()
const port = 3000



app.all('/node', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

const client = myRedis.createClient({
  url: 'redis://@172.17.0.2:6379'
});
client.connect();

// get data from redis
async function redis(name, isSet = 0) {
  //open socket redis
  
  client.on('error', (err) => console.log('Redis Client Error', err));
  let value = 0;

  if (isSet == 1) {
    await client.set(data, name);
    value = 1;
  }
  else {
     value = await client.get(name);
  }
  //close socket redis

  if (value != null)
    return value;
  else
    return -1;

}

getMethod = async function (req, res, next) {
  //input from client with rest api method
  const name = req.query["name"]
  console.log(name);
  //get value from redis if has .
  data = await redis(name);
  console.log(data);
  //check data 
  if (data != -1) res.json({ "response": data })
  else res.json({ "response": -1 })

}


function postMethod(req, res, next) {
  const name = req.query["name"]

  console.log(name + "\n")
  // console.log(String( name.length))
  if (name.length > 8) {

    const data = crypto.createHash('sha256').update(name).digest('hex');
    console.log(data);

    value = redis(data, 1);

    if (value == "1")
      res.json({ "response": data })
    else res.json({ "response": -1 })
  }
  else res.json({ "response": -1 });
}

app.get('/node', getMethod)

app.post('/node', postMethod)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
