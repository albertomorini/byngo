//THIS CLASS IS A BRIDGE FROM HTTPS SERVER AND MONGODB
const { MongoClient, ObjectId } = require("mongodb"); // we can use ObjectId on finds even if isn't human friendly

/**
 * @param {string} url of connection to MongoDB engine
 * @param {string} database name of db
 * @returns Array - list of collections inside the db
 */
function CollectionsList(url = "mongodb://localhost:27017/", database){
     if(url.charAt(url.length-1)!="/"){
          url+="/"
     }
     const dbLocal = new MongoClient(url  + database).db(database);
     return dbLocal.listCollections().toArray();
}

/**
 * 
 * @param {string} name of new collection
 * @returns {Promise} outcome of the creation
 */
function CollectionCreate(url = "mongodb://localhost:27017/", database, name){
     const dbLocal = new MongoClient(url + database).db(database);
     try{
          dbLocal.createCollection(name).finally(s=>s);
          return CollectionsList(url,database)
     }catch(ex){
          return ex;
     }
}
function CollectionDelete(url = "mongodb://localhost:27017/", database, name){
     const dbLocal = new MongoClient(url + database).db(database);
     try{
          dbLocal.dropCollection(name);
          return CollectionsList(url,database);
     }catch(ex){
          return ex;
     }
}

////////////////////

/**
 * SELECT
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {object} paramDelete is the WHERE of SQL
 * @returns {Promise} the outcome of the query
 */
function QuerySelect(url="mongodb://localhost:27017/",database,collection,filters={}){
     const dbLocal = new MongoClient(url+"/"+database).db(database);
     if ("_id" in filters){ //the filters contains the id, so use the MongoDB ObjectId
          filters._id = new ObjectId(filters?._id);
     }
     return dbLocal.collection(collection).find(filters).toArray();
}

/**
 * INSERT MANY
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {Array of objects} paramDelete inser many objects
 * @returns {Promise} the outcome of the query
 */
function QueryInsert(url = "mongodb://localhost:27017/",database, collection, objDataInsert){
     const dbLocal = new MongoClient(url+"/"+database).db(database);
     return dbLocal.collection(collection).insertMany(objDataInsert);
}

/**
 * DELETE MANY
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {object} paramDelete is the WHERE of SQL
 * @returns {Promise} the outcome of the query
 */
function QueryDelete(url = "mongodb://localhost:27017/", database, collection, filters ={}) {
     const dbLocal = new MongoClient(url+"/"+database).db(database);
     if ("_id" in filters) { //the filters contains the id, so use the MongoDB ObjectId
          filters._id = new ObjectId(filters?._id)
     }
     return dbLocal.collection(collection).deleteMany(filters);
}

/**
 * UPDATE MANY
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {object} filters the filter (WHERE of SQL)
 * @param {object} newObj new object (SET - SQL)
 * @param {boolean} upsertP if true and the update fails to find documents make an insert
 * @returns 
 */
function QueryUpdate(url = "mongodb://localhost:27017/",database, collection, filters,newObj,upsertP=false) {
     const dbLocal = new MongoClient(url+"/"+database).db(database);
     if ("_id" in filters) { //the filters contains the id, so use the MongoDB ObjectId
          filters._id = new ObjectId(filters?._id)
     }
     return dbLocal.collection(collection).updateMany(filters, { $set: newObj},{upsert: upsertP});
}


module.exports = {
     QueryDelete: QueryDelete,
     QueryInsert: QueryInsert,
     QuerySelect:QuerySelect,
     QueryUpdate: QueryUpdate,
     CollectionCreate: CollectionCreate,
     CollectionDelete: CollectionDelete,
     CollectionsList: CollectionsList
}