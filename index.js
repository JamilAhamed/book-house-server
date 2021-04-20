const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1a8q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port =5000;

app.get('/', (req, res) =>{
    res.send("hello its from server side its working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err)
  const pictureCollection = client.db("jamilsPhotography").collection("photography");
//   client.close();
app.post('/addPicture', (req, res) =>{
    const picture =req.body;
    console.log(picture);
    pictureCollection.insertOne(picture)
    .then(result =>{
        res.send(result.insertedCount > 0)
    })
});
    app.post('/addorder',(req,res) =>{
        const order =req.body;
        console.log(order);
        pictureCollection.find({order:order})
        .toArray((err,documents) =>{
            res.send(documents);
        })
    })
});

app.listen(process.env.PORT || port)