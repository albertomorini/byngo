//THIS CLASS IS A BRIDGE FROM HTTPS SERVER AND MONGODB
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

////////////////////

function CollectionCreate(){
     
}
function CollectionDelete(){
     
}

////////////////////

/**
 * SELECT
 * @param {string} database name of db
 * @param {*} collection name of the collection (SQL - TABLE)
 * @param {object} paramDelete is the WHERE of SQL
 * @returns {Promise} the outcome of the query
 */
function QuerySelect(url="mongodb://localhost:27017/",database,collection,parameters={}){
     const dbLocal = new MongoClient(url+database).db(database);
     return dbLocal.collection(collection).find(parameters).toArray()
}

/**
 * INSERT MANY
 * @param {string} database name of db
 * @param {*} collection name of the collection (SQL - TABLE)
 * @param {Array of objects} paramDelete inser many objects
 * @returns {Promise} the outcome of the query
 */
function QueryInsert(url = "mongodb://localhost:27017/",database, collection, objDataInsert){
     const dbLocal = new MongoClient(url + database).db(database);
     return dbLocal.collection(collection).insertMany(objDataInsert);
}
////

/**
 * DELETE MANY
 * @param {string} database name of db
 * @param {*} collection name of the collection (SQL - TABLE)
 * @param {object} paramDelete is the WHERE of SQL
 * @returns {Promise} the outcome of the query
 */
function QueryDelete(url = "mongodb://localhost:27017/",database, collection, paramDelete={}) {
     const dbLocal = new MongoClient(url + database).db(database);
     return dbLocal.collection(collection).deleteMany(paramDelete);
}

//TODO: TEST!
function QueryUpdate(url = "mongodb://localhost:27017/",database, collection, paramDelete) {
     const dbLocal = new MongoClient(url + database).db(database);
     return dbLocal.collection(collection).updateMany(paramUpdate)
}



//////

function QueryInsertUpdate(){
     const dbo = database.collection(COLLECTION_TRANSACTIONS);
     // create the document to insert
     const updateDoc = {
          $set: {
               Email: objReg.Email,
               Amount: objReg.Amount,
               Date: objReg.Date,
               IsOutcome: objReg.IsOutcome,
               Reference: objReg.Reference,
          },
     };

     console.log(objReg);
     return getUser(objReg.Email, objReg.Password).then(resAuth => {
          console.log(resAuth);
          if (resAuth != null) { //user authenticated --> insert/update the new doc
               return dbo.updateOne({ _id: new ObjectId(objReg.id), "Email": objReg.Email }, updateDoc, { upsert: true });
          } else {
               return null
          }
     }).catch(err => {
          console.log(err);
          return null;
     })
}


module.exports = {
     QueryDelete: QueryDelete,
     QueryInsert: QueryInsert,
     QueryInsertUpdate: QueryInsertUpdate,
     QuerySelect:QuerySelect,
     QueryUpdate: QueryUpdate,
     CollectionCreate: CollectionCreate,
     CollectionDelete: CollectionDelete
}