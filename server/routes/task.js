var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//sets pid based on priority level
function PID(priority){ switch(priority){
                  case 'high':
                    return 1;
                  case 'medium':
                    return 2;
                  case 'low':
                    return 3;
                  }
}

var config = {
  database: 'chi', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      db.query('SELECT * FROM weekend3_tasks ORDER BY "completed" ASC, "pid" ASC;', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.put('/edit', function(req, res){
  var id = Number(req.body.id);
  var task = req.body.task;
  var priority = req.body.priority;

  var pid = PID(priority);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      db.query('UPDATE weekend3_tasks ' +
                'SET task=$1, priority=$2, pid=$3 WHERE id=$4;',
                [task, priority, pid, id], function(queryError, result){
                done();
        if(queryError) {
          console.log('Error making query.');
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/completed', function(req, res){
  var id = Number(req.body.id);
  var task = req.body.task;
  var priority = req.body.priority;
  var completed = req.body.completed;
  if (completed === 'false'){
    completed = 'true';
  } else {
    completed = 'false';
  }
  console.log(completed);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      db.query('UPDATE weekend3_tasks ' +
                'SET task=$1, priority=$2, completed=$3 WHERE id=$4;',
                [task, priority, completed, id],
        function(queryError, result){
                done();
        if(queryError) {
          console.log('Error making query.');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.post('/add', function(req, res){
var task = req.body.task;
var priority = req.body.priority;
var completed = req.body.completed;
var pid = PID(priority);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO weekend3_tasks (task, priority, completed, pid)' +
                'VALUES ($1, $2, $3, $4);',
                [task, priority, completed, pid],
                function(queryError, result){
                done();
                if(queryError) {
                  console.log('Error making query.');
                  res.sendStatus(500);
                } else {
                  console.log(result); // Good for debugging
                  res.sendStatus(200);
                }
      });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  var id = req.params.id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('DELETE FROM weekend3_tasks WHERE id=$1;', [id], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          console.log(result); // Good for debugging
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
