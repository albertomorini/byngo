//THIS CLASS IS A BRIDGE FROM HTTPS SERVER AND MONGODB


const url = "mongodb://localhost:27017/";
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

////////////////////

function CollectionCreate(){
     
}
function CollectionDelete(){

}

////////////////////

function QuerySelect(database,collection,parameters){
     const dbLocal = new MongoClient(url+database).db(database);
     return dbLocal.collection(collection).find(parameters).toArray()
}


function QueryInsert(database, collection, objDataInsert){
     const dbLocal = new MongoClient(url + database).db(database);
     return dbLocal.collection(collection).insertMany(objDataInsert);
}
////


function QueryDelete(database, collection, id) { //one, many
     //TODO: how to do the ID?
     const dbLocal = new MongoClient(url + database).db(database);

     return dbLocal.collection(collection).deleteOne({ "_id": new ObjectId(id), "Email": Email })
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


function QueryUpdate(){

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