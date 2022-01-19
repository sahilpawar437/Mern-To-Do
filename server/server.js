const express = require('express'),
  {
    MongoClient,
    ObjectID,
  } = require('mongodb'),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require('cors'),
  {
    dbName,
    dbUrl,
    port,
  } = require('./config'),
  dbClient = new MongoClient(dbUrl),
  app = express(),

  // Get All Todos
  getAllTodos = (db, res) => {
    db.collection(dbName).find().toArray((error, docs) => {
      if (error) throw error;
      res.send(docs);
    });
  },

  // Create Todo
  insertTodo = (db, requestBody, res) => {
    db.collection(dbName).insertOne(requestBody, (err, docs) => {
      if (err) throw err;
      res.send(requestBody._id);
    });
  },

  // Get Todo
  getTodo = (db, requestBody, res) => {
    db.collection(dbName).find(requestBody).toArray((err, docs) => {
      if (err) throw err;
      res.send(docs);
    });
  },

  // Update Todo
  // updateTodo = (db, requestBody) => {
  //   db.collection(dbName).update(requestBody);
  // },

  // Delete Todo
  deleteTodo = (db, requestBody, res) => {
    const id = requestBody._id;
    db.collection(dbName).deleteOne({
      _id: new ObjectID(id),
    }, (err) => {
      if (err) throw err;
      res.send('Deleted Successfully');
    });
  };

// Applying Development Logs and Body Parser Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8000',
}));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// DB Connection
dbClient.connect((err) => {
  const db = dbClient.db(dbName);
  assert.equal(null, err);
  console.log('Connected To Database Server');

  // Routes For REST API
  app.get('/todos', (req, res) => {
    getAllTodos(db, res);
  });

  app.post('/todo', (req, res) => {
    insertTodo(db, req.body, res);
  });

  app.get('/todo', (req, res) => {
    getTodo(db, req.body, res);
  });

  // app.put('/todo', (req, res) => {
  //   updateTodo(db, req.body, res);
  // });

  app.delete('/todo', (req, res) => {
    deleteTodo(db, req.body, res);
  });

  // Server Start
  app.listen(port, () => console.log(`Listening on Port ${port}`));
});
