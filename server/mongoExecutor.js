//THIS CLASS IS A BRIDGE FROM HTTPS SERVER AND MONGODB


const url = "mongodb://localhost:27017/Walletter";
const { MongoClient } = require("mongodb");
const database = new MongoClient(url).db("Walletter");
const { ObjectId } = require('mongodb');
const COLLECTION_TRANSACTIONS = "WT_TRANSACTIONS";
const COLLECTION_USERS = "WT_USERS";

const fs = require("fs"); //we need to write the export file before send it

////////////////////

function CollectionCreate(){
     
}
function CollectionDelete(){

}

////////////////////

function QuerySelect(){
     return database.collection(COLLECTION_USERS).find({ "email": email, "psw": psw }).toArray().then(resAuth => {
          if (resAuth.length == 0) { //not found or error return null
               return null;
          } else {
               return resAuth[0]
          }
     }).catch(err => {
          return null;
     })
}


function QueryInsert(){
     return getUser(objUsr.email, objUsr.psw).then(resAuth => {
          if (resAuth == null) { //if user doesn't exists, we create a new one
               return database.collection(COLLECTION_USERS).insertOne(objUsr);
          } else {
               return null;
          }
     })
}

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


function QueryDelete(){ //one, many
     return getUser(Email, Password).then(resAuth => {
          if (resAuth != null) {
               return database.collection(COLLECTION_TRANSACTIONS).deleteOne({ "_id": new ObjectId(idTransaction), "Email": Email })
          } else {
               return null;
          }
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