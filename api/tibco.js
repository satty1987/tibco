const express = require('express')
const tibco = express.Router();
const https = require('https');

var ObjectID = require('mongodb').ObjectID;

tibco.get('/getsolutionv1', (req, res, next) => {
  const requestDb = req.app.locals.db.collection("getsolutions");
  requestDb.find().toArray((err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    if (result === undefined || result.length === 0) {
      res.status(500).send({ 'error': 'No Result Found in database' })
    } else {
      res.status(200).send(result)
    }
  })
})

tibco.delete('/getsolution/:id', (req, res, next) => {
  const requestDb = req.app.locals.db.collection("getsolutions");
  requestDb.deleteOne({
    '_id': ObjectID(req.params.id)
  }, (err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    res.status(200).send(result)
  })
})
tibco.delete('/report/:id', async (req, res, next) => {
  const reportDb = req.app.locals.db.collection("report");
  const requestDb = req.app.locals.db.collection("getsolutions");
  try {
    const deleteReport = await reportDb.deleteOne({ 'deleteId': ObjectID(req.params.id) });
    if(req.query.status === 'approve'){
      const deletePost = await requestDb.deleteOne({ '_id': ObjectID(req.params.id) });
    }
    res.status(200).send({ message: "Successfully deleted" })
  } catch (error) {
    res.status(200).send(error)
  }
});

tibco.get('/report', (req, res, next) => {
  const reportDb = req.app.locals.db.collection("report");
  reportDb.find().toArray((err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    if (result === undefined || result.length === 0) {
      res.status(500).send({ 'error': 'No Result Found in database' })
    } else {
      res.status(200).send(result)
    }
  })
})

tibco.get('/report/:id', async (req, res, next) => {
  const reportDb = req.app.locals.db.collection("report");
  const requestDb = req.app.locals.db.collection("getsolutions");
  try {
    const find = await reportDb.find({ "deleteId": ObjectID(req.params.id) }).toArray();
    console.log(find);
    if (find && find.length > 0) {
      res.status(501).send({ message: "Post already reported" });
      return;
    }
    const field = await requestDb.find({ "_id": ObjectID(req.params.id) }).toArray();
    const body = {
      'title': field[0].title,
      'error_description': field[0].error_description,
      'solution': field[0].solution,
      'deleteId': field[0]._id,
      'reason':req.query.reason,
      'user': field[0].user
    };
    const registerReport = await reportDb.insertOne(body);
    res.status(200).send({ message: "Update report successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
})

tibco.get('/search', async (req, res, next) => {
  const requestDb = req.app.locals.db.collection("getsolutions");
  let response;
  try {
    const index = await requestDb.createIndex({ "$**": "text" });
    response = await requestDb.find({ $text: { $search: req.query.keyword } }).toArray();
    if (response === undefined || response.length === 0) {
      res.status(500).send({ 'error': 'No Result found in database' })
    } else {

      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send({ 'error': error })
  }
})

tibco.post("/getsolution", (req, res) => {
  const requestDb = req.app.locals.db.collection("newPost");

  const body = {
    'title': req.body.title,
    'error_description': req.body.error_description,
    'solution': req.body.solution,
    'user': req.body.user
  };
  requestDb.insertOne(body, (err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    res.status(200).send({ message: "Request created successfully" })
  })
});

tibco.get('/new-posts', (req, res, next) => {
  const requestDb = req.app.locals.db.collection("newPost");
  requestDb.find().toArray((err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    if (result === undefined || result.length === 0) {
      res.status(500).send({ 'error': 'No Result Found in database' })
    } else {
      res.status(200).send(result)
    }
  })
})

tibco.post('/new-posts', async (req, res, next) => {
  const newpostDb = req.app.locals.db.collection("newPost");
  const requestDb = req.app.locals.db.collection("getsolutions");
  try {
    if(req.body.type ==='reject'){
      const deleteReport = await newpostDb.deleteOne({ '_id': ObjectID(req.body._id) });
      res.status(200).send({ message: "Request rejeceted successfully" });
      return;
    }
    const deleteReport = await newpostDb.deleteOne({ '_id': ObjectID(req.body._id) });
    const body = {
      'title': req.body.title,
      'error_description': req.body.error_description,
      'solution': req.body.solution,
      'user': req.body.user
    };
    const postrequest = await requestDb.insertOne(body)
    res.status(200).send({ message: "Request created successfully" });

  } catch (error) {
    res.status(400).send(error)
  }


})

tibco.put('/getsolution',async (req, res, next) => {
  const requestDb = req.app.locals.db.collection("getsolutions");
  const updateDb = req.app.locals.db.collection("updateRequest");

  if(req.body.type ==='reject'){
    const deleteReport = await updateDb.deleteOne({ '_id': ObjectID(req.body._id) });
    res.status(200).send({ message: "Request created successfully" });
    return;
  }

  const body = {
    'title': req.body.title,
    'error_description': req.body.error_description,
    'solution': req.body.solution,
    'user': req.body.user
  };
  const deleteReport = await updateDb.deleteOne({ '_id': ObjectID(req.body._id) });
  requestDb.updateOne({
    '_id': ObjectID(req.body.updateId)
  },
    {
      $set: body
    }, (err, result) => {
      if (err) {
        res.status(400).send({ 'error': err })
      }
      res.status(200).send(result)
    })
});

tibco.post('/update-request', async (req, res, next) => {
  const requestDb = req.app.locals.db.collection("updateRequest");
  try {
    const body = {
      'title': req.body.title,
      'error_description': req.body.error_description,
      'solution': req.body.solution,
      'updateId': req.body._id,
      'user': req.body.user,
      'reason': req.body.reason
    };
    const update = await requestDb.insertOne(body);
    res.status(200).send({ message: "Request created successfully" })
  } catch (error) {
    res.status(400).send({ 'error': err })
  }
});
tibco.get('/update-request', (req, res, next) => {
  const reportDb = req.app.locals.db.collection("updateRequest");
  reportDb.find().toArray((err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    if (result === undefined || result.length === 0) {
      res.status(500).send({ 'message': 'No Result Found in database' })
    } else {
      res.status(200).send(result)
    }
  })

});

tibco.get('/stats', async (req, res, next) => {
  const db = req.app.locals.db.collection("getsolutions");

  try {
    const count = await db.countDocuments();
    const users = await db.distinct( "user" )
    console.log(count);
    res.status(200).send({'status' : count,'users' : users.length});
  } catch (error) {

  }

});

tibco.get('/test', async (req, res, next) => {
  const db = req.app.locals.db.collection("getsolutions");

  try {
    const write  = await  db.updateMany({},{$set: {"timestamp": +new Date()}},false,true);
    res.status(200).send({'status' : 'done'});
  } catch (error) {
    res.status(500).send({'status' : error});
  }

});

tibco.post('/likes', async (req, res, next) => {
  const requestDb = req.app.locals.db.collection("likeCollection");
  try {
    const likes  = await  requestDb.find({user:req.body.user, postId: req.body.postId }).toArray();
    if(likes.length > 0){
      res.status(200).send({ message: "Already Liked the post" });
      return;
    }
    const body = {
      'user': req.body.user,
      'postId' : req.body.postId
    };
    const update = await requestDb.insertOne(body);
    res.status(200).send({ message: "Post Liked" })
  } catch (error) {
    res.status(400).send({ 'error': err })
  }
});

tibco.get('/likes', async (req, res, next) => {
  const db = req.app.locals.db.collection("likeCollection");

  try {
    const likes  = await  db.find().toArray();
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).send({'status' : error});
  }

});

tibco.get('/getsolution', async (req, res, next) => {
  const db = req.app.locals.db.collection("getsolutions");

  try {
    const likes  = await  db.aggregate([ {
      "$project": {
        "_id": {
          "$toString": "$_id"
        },
        "user": {
          "$toString": "$user"
        },
        "title": {
          "$toString": "$title"
        },
        "error_description": {
          "$toString": "$error_description"
        },
        "solution": {
          "$toString": "$solution"
        },
        "timestamp": {
          "$toDate": "$timestamp"
        }
      }
    },{
      $lookup: {
        from: "likeCollection",
        localField: "_id",
        foreignField: "postId",
        as: "likes"
      }
    }]).toArray();

    res.status(200).send(likes);
  } catch (error) {
    res.status(500).send({'status' : error});
  }

});

// tibco.get('/write', async (req, res) => {

//   const requestDb = req.app.locals.db.collection("getsolutions");


//   const jsonURL = "https://raw.githubusercontent.com/satty1987/configs/master/db.json";
//   https.get(jsonURL, (response) => {
//   console.log(jsonURL);
//   let body = '';
//   response.on('data', function(chunk) {
//     body += chunk;
//   });
//   response.on('end', function() {
//     let json = JSON.parse(body);
//     requestDb.insertMany(json, (error, result) => {
//       console.log(result);
//     });
//   });
// })
// })

module.exports = tibco
