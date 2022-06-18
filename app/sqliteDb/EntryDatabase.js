import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'EntryMaster.db';
const database_version = '1.0';
const database_displayname = 'Entries';
const database_size = 200000;

export default class EntryDatabase {
  initDB() {
    let db;
    return new Promise(resolve => {
      // console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          // console.log('Integrity check passed ...');
          // console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              // console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Entries LIMIT 1')
                .then(() => {
                  // console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  // console.log('Received error: ', error);
                  // console.log('Database not yet ready ... populating data');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Entries (id PRIMARY KEY, API, Description)',
                    );
                  })
                    .then(() => {
                      // console.log('Table created successfully');
                    })
                    .catch(error => {
                      // console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              // console.log(error);
            });
        })
        .catch(error => {
          // console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      // console.log('Closing DB');
      db.close()
        .then(status => {
          // console.log('Database CLOSED');
        })
        .catch(error => {
          // this.errorCB(error);
        });
    } else {
      // console.log('Database was not OPENED');
    }
  }

  getEntriesList() {
    return new Promise(resolve => {
      const entriesList = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.id, p.API, p.Description FROM Entries p',
              [],
            ).then(([tx, results]) => {
              // console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.log('Entries', row);
                const {id, API, Description} = row;
                entriesList.push({
                  id,
                  API,
                  Description,
                });
              }
              resolve(entriesList);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              // console.log(err);
            });
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }

  addEntry(data) {
    return new Promise(resolve => {
      // console.log('[EntryDatabase.js] add Entry : ', data);
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Entries VALUES (?, ?, ?)', [
              data.id,
              data.API,
              data.Description,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              // console.log(err);
            });
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }

  deleteEntry(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Entries WHERE id = ?', [id]).then(
              ([tx, results]) => {
                // console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              // console.log(err);
            });
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }
}
