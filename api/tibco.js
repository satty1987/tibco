const express = require('express')
const tibco = express.Router();


var ObjectID = require('mongodb').ObjectID;

tibco.get('/getsolution', (req, res, next) => {
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
      'reason':req.query.reason
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
  const requestDb = req.app.locals.db.collection("getsolutions");

  const body = {
    'title': req.body.title,
    'error_description': req.body.error_description,
    'solution': req.body.solution
  };
  requestDb.insertOne(body, (err, result) => {
    if (err) {
      res.status(400).send({ 'error': err })
    }
    res.status(200).send({ message: "Request created successfully" })
  })
});

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
    'solution': req.body.solution
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
      'updateId': req.body._id
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

module.exports = tibco
