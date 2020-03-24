const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Metadata = require('../../_domain/metadata');

const dbUri = "mongodb://localhost:27017/VLLDataSystem";
mongoose.Promise = global.Promise;
mongoose.connect(dbUri, function (err) {
  if (err){
    console.error("Error!" + err);
  }
});

router.get('/metadata', function (req, res) {
  console.log('Get request for metadata');
  Metadata.find({})
    .exec(function (err, metadataList) {
      if (err){
        console.log('Error retrieving metadata')
      } else {
        res.json(metadataList);
      }
    })
});

module.exports = router;
