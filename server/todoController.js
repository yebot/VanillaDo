const db = require('./todoModel.js');
const todoController = {};

// Creates a new todo in DB, returns count of rows created and the row data itself
todoController.create = (req, res, next) => {
  const sql = `INSERT INTO todo(name, done)
                VALUES($1, $2)
                RETURNING *;`;
  const { name, done } = req.body;
  const values = [ name, done ];
  db.query(sql, values)
    .then(data => {
      res.locals.rowCount = data.rowCount;
      res.locals.rows = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: `Unable to create new record in SQL database - ${err}`,
        status: 500,
        message: { err: 'A database error occurred (.create)' },
      });
    });
};

// Return all of the todos in the DB
todoController.read = (req, res, next) => {
  const sql = `SELECT id, name, done
                FROM todo;`;
  db.query(sql)
    .then(data => {
      res.locals.rowCount = data.rowCount;
      res.locals.rows = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: `Unable to get data from SQL database - ${err}`,
        status: 500,
        message: { err: 'A database error occurred (.read)' },
      });
    });
};

// Updates one todo item in the DB - returns rowCount of # of effected.
todoController.update = (req, res, next) => {
  const sql = `UPDATE todo
                SET name = $1, done = $2
                WHERE id = $3;`;
  const { name, done } = req.body;
  const id = parseInt(req.params.id);
  const values = [ name, done, id ];
  db.query(sql, values)
    .then(data => {
      res.locals.rowCount = data.rowCount;
      return next();
    })
    .catch(err => {
      return next({
        log: `Unable to update record in SQL database - ${err}`,
        status: 500,
        message: { err: 'A database error occurred (.update)' },
      });
    });
};

// Deletes one DB item in the db, returns a rowCount of # of effected.
todoController.delete = (req, res, next) => {
  const sql = `DELETE FROM todo
                WHERE id = $1;`;
  const id = parseInt(req.params.id);
  db.query(sql, [id])
  .then(data => {
    res.locals.rowCount = data.rowCount;
    return next();
  })
  .catch(err => {
    return next({
      log: `Unable to delete record in SQL database - ${err}`,
      status: 500,
      message: { err: 'A database error occurred (.delete)' },
    });
  });
};

module.exports = todoController;