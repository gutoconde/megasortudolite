var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = process.env.MEGASORTUDO_DBSOURCE; 

var db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } else {  
      console.log('Conectado ao banco de dados.');
    }
    
});
if(db) {
  db.get('PRAGMA encoding="UTF-8"');
  db.get('PRAGMA foreign_keys = ON');
}

module.exports = db;