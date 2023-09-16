//THIS CLASS IS A BRIDGE FROM HTTPS SERVER AND MONGODB
const { MongoClient, ObjectId } = require("mongodb"); // we can use ObjectId on finds even if isn't human friendly


function writeLog(kind = "DEBUG", message) {
     console.log(
          kind + "," +
          message + "," +
          Date() + "\n\n"
     );
}

/**
 * CHECK URL PATH
 * @param {string} url given by user
 * @returns {string} the correct URL
 */
function checkURL(url) {
     try {
          if (url.charAt(url.length - 1) != "/") {
               return url += "/"
          } else {
               return url;
          }
     } catch (error) {
          writeLog("ERROR", error)
          return error
     }
}

/**
 * @param {string} url of connection to MongoDB engine
 * @param {string} database name of db
 * @returns Array - list of collections inside the db
 */
function CollectionsList(url = "mongodb://localhost:27017/", database) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + database).db(database);
          return dbLocal.listCollections().toArray();
     } catch (error) {
          writeLog("ERROR", error)
          return error;
     }
}

/**
 * @param {string} url of connection to MongoDB engine
 * @param {string} database name of db
 * @param {string} name of new collection
 * @returns Array - list of collections inside the db
 */
function CollectionCreate(url = "mongodb://localhost:27017/", database, name) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + database).db(database);
          dbLocal.createCollection(name).finally(s => s);
          return CollectionsList(url, database)
     } catch (ex) {
          writeLog("ERROR", ex)
          return ex;
     }
}
/**
 * DROP COLLECTION
 * @param {string} url of connection to MongoDB engine
 * @param {string} database name of db
 * @param {string} name of collection to delete
 * @returns Array - list of collections inside the db
 */
function CollectionDelete(url = "mongodb://localhost:27017/", database, name) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + database).db(database);
          dbLocal.dropCollection(name);
          return CollectionsList(url, database);
     } catch (ex) {
          writeLog("ERROR", ex)
          return ex;
     }
}
/**
 * 
 * @param {string} url of connection to MongoDB engine
 * @param {string} database name of db
 * @param {string} oldName of the collection to rename
 * @param {string} newName which will rename the collection
 * @returns Array - list of collections inside the db
 */
function CollectionRename(url = "mongodb://localhost:27017/", database, oldName, newName) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + database).db(database);
          dbLocal.renameCollection(oldName, newName);
          return CollectionsList(url, database);
     } catch (ex) {
          writeLog("ERROR", ex)
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
function QuerySelect(url = "mongodb://localhost:27017/", database, collection, filters = {}) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + "/" + database).db(database);
          if ("_id" in filters) { //the filters contains the id, so use the MongoDB ObjectId
               filters._id = new ObjectId(filters?._id);
          }
          return dbLocal.collection(collection).find(filters).toArray();
     } catch (error) {
          writeLog("ERROR", error)
          return error;
     }

}

/**
 * INSERT MANY
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {Array of objects} paramDelete inser many objects
 * @returns {Promise} the outcome of the query
 */
function QueryInsert(url = "mongodb://localhost:27017/", database, collection, objDataInsert) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + "/" + database).db(database);
          return dbLocal.collection(collection).insertMany(objDataInsert);
     } catch (error) {
          writeLog("ERROR", error)
          return error;
     }

}

/**
 * DELETE MANY
 * @param {string} url of MongoDB instance
 * @param {string} database name of db
 * @param {string} collection name of the collection (SQL - TABLE)
 * @param {object} paramDelete is the WHERE of SQL
 * @returns {Promise} the outcome of the query
 */
function QueryDelete(url = "mongodb://localhost:27017/", database, collection, filters = {}) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + "/" + database).db(database);
          if ("_id" in filters) { //the filters contains the id, so use the MongoDB ObjectId
               filters._id = new ObjectId(filters?._id)
          }
          return dbLocal.collection(collection).deleteMany(filters);
     } catch (error) {
          writeLog("ERROR", error)
          return error;
     }

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
function QueryUpdate(url = "mongodb://localhost:27017/", database, collection, filters, newObj, upsertP = false) {
     url = checkURL(url)
     try {
          const dbLocal = new MongoClient(url + "/" + database).db(database);
          if ("_id" in filters) { //the filters contains the id, so use the MongoDB ObjectId
               filters._id = new ObjectId(filters?._id)
          }
          return dbLocal.collection(collection).updateMany(filters, { $set: newObj }, { upsert: upsertP });
     } catch (error) {
          writeLog("ERROR", error)
          return error
     }
}

module.exports = {
     QueryDelete: QueryDelete,
     QueryInsert: QueryInsert,
     QuerySelect: QuerySelect,
     QueryUpdate: QueryUpdate,
     CollectionCreate: CollectionCreate,
     CollectionDelete: CollectionDelete,
     CollectionsList: CollectionsList,
     CollectionRename: CollectionRename
}