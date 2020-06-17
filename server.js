const express = require('express');
const app = express();
const port = process.env.PORT || 9000
const bodyParser = require('body-parser');
var cors = require('cors');
const tibco = require('./api/tibco.js');

const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors());
app.use(express.static(__dirname + '/dist/tibco'));

app.use('/v1', tibco);
app.get('*', (req, res) => {
  res.sendfile('./dist/tibco/index.html');
})
//const url = "mongodb://ec2-3-133-105-146.us-east-2.compute.amazonaws.com:27017/cegoogler";
const url = "mongodb+srv://apandey26:apandey26@ashish-i6w8s.mongodb.net/test?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
MongoClient.connect(url, options, (err, database) => {
    if (err) {
      console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
      process.exit(1)
    }
    app.locals.db = database.db('cegoogler')
    app.listen(port, () => console.log(`Example app listening on port- `+port))
  })
