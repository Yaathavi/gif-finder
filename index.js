const express = require ("express");
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const cors = require("cors"); //makes sure endpoints are being accessed the right way
const path = require('path'); //serve ur static file

require('dotenv').config();
const APIToken = process.env.API_KEY;
const GIFKEY = process.env.GIFKEY;

app.use(cors());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  })
}
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the client
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call.
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${APIToken}`);


app.post("/getdata",(req, res) => {

  stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        //inputs: [{data: {image: {url: "https://samples.clarifai.com/dog2.jpeg"}}}] we have to rewrite this
        inputs: [{data: {image: {url: req.body.first}}}]
    },
    metadata,
    (err, response) => {

      var array = []; //initializing array
      
        if (err) {
            console.log("Error: " + err);
            return;
        }
  
        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }
  
        for (const c of response.outputs[0].data.concepts) {
            //console.log(c.name + ": " + c.value);
            array.push(`${c.name}`); // changed this line so instead of printing to terminal, it stores the classifications in an array
        }
        console.log(array); 
        //res.send({"name":array}); sends array back to frontend
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIFKEY}&limit=10&q=${array[0]}`)
          .then(response => response.json())
          .then(data => {

            var URLS = []; 
            for (var x=0; x<10; x++) {
              URLS.push(data.data[x].images.original.url)
            }
            res.send(URLS);
          })
    }
  );
  
});

app.get('/', (req, res) => {
  res.send("test")
}) 
app.listen(port, () => console.log(`Listening on port ${port}!`)); //starts a server and listens on port 5000 for connections.



