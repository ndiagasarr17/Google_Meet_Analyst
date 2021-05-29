var mysql = require('mysql')
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'googlemeetanalyser'
})

app.set('view engine', 'pug')

app.use(express.static('../../Front'))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('Formulaire.html', { root: '../../Front'})
})

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
})

app.post('/', function(req, res){
  console.log(req.body);
  var sql = "insert into reponses values('"+ req.body.quest1 +"', '"+ req.body.quest2 +"','"+ req.body.quest3 +"','"+ req.body.quest4 +"','"+ req.body.quest5 +"','"+ req.body.quest6 +"','"+ req.body.quest7 +"','"+ req.body.quest8 +"','"+ req.body.quest9 +"','"+ req.body.quest10 +"','"+ req.body.quest11 +"','"+ req.body.quest12 +"','"+ req.body.quest13 +"','"+ req.body.quest14 +"','"+ req.body.quest15 +"','"+ req.body.quest16 +"','"+ req.body.quest17 +"','"+ req.body.suggest +"');";
  connection.query(sql, function (err) {
    if (err) throw err
    res.render('index', {title: 'Data Saved', message: 'Data Saved Successfully!!'})
  })
  connection.end();
})

app.listen(port, () => console.log(`App Listening on port ${port}!!`))