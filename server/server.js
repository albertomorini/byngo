const http = require("http");
const { QueryInsert, QueryUpdate, QueryDelete, CollectionDelete, CollectionCreate, QuerySelect, CollectionsList } = require("./mongoExecutor");
const port = 2023;

/**
 * Do the HTTP response
 * @param {Object} res HTTPS response object
 * @param {int} status like 200/500
 * @param {Object} body body of response
 * @param {String} contentType the content type of our response
 */
function sendResponse(res, status, body, contentType = "application/json") {
     res.writeHead(status, { "Content-type": contentType, "Access-Control-Allow-Origin": "*" })
     if (contentType != "application/json") { //with export operation we send a file so we cant strinify the body
          res.write(body);
     } else {
          res.write(JSON.stringify(body));
     }
     res.end();
}

const server = http.createServer((req,res)=>{

     let body="";
     req.on("data",(chunk)=>{
          body+=chunk;
     })
     req.on("end",()=>{
          try{
               body=JSON.parse(body);
          }catch(Ex){
               //not a JSON
          }
          if(req.url=="/QuerySELECT"){
               QuerySelect(body.url,body.database, body.collection,body?.where).then(resSelect=>{
                    sendResponse(res,200,resSelect);
               }).catch(err=>{
                    sendResponse(res,500,err);
               });
          }else if(req.url=="/QueryINSERT"){
               QueryInsert(body.url,body.database,body.collection,body.data).then(resInsert=>{
                    sendResponse(res,200,resInsert);
               }).catch(err=>{
                    sendResponse(res,500,err);
               });
          }else if(req.url=="/QueryUPDATE"){
               QueryUpdate(body.url, body.database, body.collection, body.where,body.newObj,body.upsert).then(resUpdate=>{
                    sendResponse(res,200,resUpdate);
               }).catch(err=>{
                    sendResponse(res,500,err);
               });
          }else if(req.url=="/QueryDELETE"){
               QueryDelete(body.url,body.database,body.collection,body?.where).then(resDelete=>{
                    sendResponse(res,200,resDelete);
               }).catch(err=>{
                    sendResponse(res,500,err);
               });
          }

          //COLLECTIONS
          
          if(req.url=="/CollectionCreate"){
               CollectionCreate();
          } else if (req.url =="/CollectionsList"){
               CollectionsList(body.url,body.database).then(resCL=>{
                    sendResponse(res,200,resCL);
               }).catch(err=>{
                    sendResponse(res,500,err);
               })
          }else if(req.url="/CollectionDelete"){
               CollectionDelete();
          }

     });

})

server.listen(port);