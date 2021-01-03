const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://curdServer:curdServer12345@cluster0.bdvqy.mongodb.net/Services?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });

const app = express();
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));




app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});




client.connect(err => {
  const serviceCollection = client.db("Services").collection("Service");


  app.get('/service' , (req, res) =>{
    serviceCollection.find({}).limit(4)
    .toArray( (err , documents) =>{
      res.send(documents);
    }) 
  });

  app.post('/addService' , (req , res) => {
    const service = req.body;
    serviceCollection.insertOne(service)
    .then(result => {
      console.log('added one');
      res.send('success')
    });
  });

  

 });

app.listen(5000);