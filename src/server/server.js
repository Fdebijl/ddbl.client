/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const mongoString = process.env.MONGO_URL;

const db = mongo.connect(mongoString, function (err, response) {
  if (err){
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});

const app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: true}));

const Schema = mongo.Schema;
const ObjectId = Schema.Types.ObjectId;

const metadataSchema = new Schema ({
    id: ObjectId,
    title: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    age_group: {
      type: String,
      required: true
    },
    contributor: {
      type: ObjectId,
      ref: 'users'
    },
    category: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    },
    access: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    file: {
      type: String,
      required: false
    },
    created: {
      type: Date,
      default: Date.now()
    },
    share: [{type: ObjectId, ref: 'users', required: false}]
    //updated: Date
  }, {collection:"metadata"} //prevent mongoose to change the collection name plural
);

let model = mongo.model('metadata', metadataSchema);

app.get("/api/getMetadata", function (req,res) {
  console.log('getMetadata called')
  model.find({}, function (err,data) {
    if (err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get("/api/getMetadataVisualizations", function (req,res) {
  console.log('getMetadataVis called')
  model.find({type: "Visualization"}, function (err,data) {
    if (err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get("/api/getUserById", function (req,res) {
  console.log('getUserById called')
  console.log(req.body);
  model.find({_id: req.body}, function (err,data) {
    if (err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.listen(6969, function () {
  console.log('VLL DS Mockserver listening on port 8080!')
})
