const express = require ("express");
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize client
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call.
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 68f0b5a16b6a4de9936a0997ac33db1b");


app.post("/getdata",(req, res) => {
  console.log(req.body.first);
  stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs: [{data: {image: {url: req.body.first}}}]
    },
    metadata,
    (err, response) => {
      var array = [];
        if (err) {
            console.log("Error: " + err);
            return;
        }
  
        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }
  
        for (const c of response.outputs[0].data.concepts) {
            array.push(`${c.name}` + ": " + `${c.value}`);
        }
        console.log(array);
        res.send({"name": array});
    }
  );
  
});

app.listen(port, () => console.log(`Listening on port ${port}!`));



