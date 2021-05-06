const express = require ('express');
const bodyParser = require('body-parser');

const app = express();


app.use(express.json());

const MongoClient = require('mongodb').MongoClient;

let db;
 MongoClient.connect('mongodb+srv://PraiseOma:Pan3lb3ater500@cluster0.pw2fk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    db = client.db('webstore')
});

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
return next()
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow CORS
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Thing created successfully!'
    });
});

app.get('/', (req, res) =>{
    res.send ('API is working, please select a collection.')
});

app.get('collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) =>{
        if (e) return next(e)
        res.send(results)
    });
});

const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) =>{
    req.collection.findOne(
        { _id: new ObjectID(req.params.id) },
        (e, result) => {
            if (e) return next(e)
            res.send(result)
        })
})

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body,(e, results) => {
if(e) return next (e)
res.send(results.ops)
    })
})

app.put('/collection/:collectionName', (req, res, next) => {
    req.collection.update(
        {_id:new ObjectID(req.params.id) },
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
            if (e) return next (e)
            res,send ((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
        })
    })

    app.delete('/collection/:collectionName', (req, res, next) => {
        req.collection.deleteOne(
            {_id: ObjectID(req.params.id)},
            (e, result) => {
                if (e) return next(e)
                res.send((result.result.n === 1)? {msg: 'success'} : {msg: 'error'})
            })
        })
         
        app.listen(2000)
        console.log('server is running on port 2000');