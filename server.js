// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});


app.get("/api/timestamp",(req,res) =>{
    res.json({
      unix : Date.now(),
      utc : Date()
    })
})


app.get("/api/timestamp/:date_string",(req,res)=>{
  var date_str = req.params.date_string;
  
  if(/\d{5,}/.test(date_str)){
    var date_int = parseInt(date_str);
    res.json({
      unix : date_int,
      utc : new Date(date_int).toUTCString()
    })
  }
  
  let date_obj = new Date(date_str);
  
  if(date_obj.toString() == "Invalid Date"){
    res.json({"error" : "Inavlid date"})
  }else{
    res.json({
      unix : date_obj.valueOf(),
      utc : date_obj.toUTCString()
    })
  }
  
  
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
