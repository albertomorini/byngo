const http = require("http");
const { QueryInsert, QueryInsertUpdate, QueryUpdate, QueryDelete, CollectionDelete, CollectionCreate, QuerySelect } = require("./mongoExecutor");
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

          if(req.url=="QuerySelect"){
               
          }else if(req.url=="QueryInsert"){
               QueryInsert(body.collection,body.data).then(queryRes=>{
                    sendResponse(res,200,queryRes);    
               })
          }else if(req.url=="QueryInsertUpdate"){
               QueryInsertUpdate();
          }else if(req.url=="QueryUpdate"){
               QueryUpdate();
          }else if(req.url="QueryDelete"){
               QueryDelete();
          }

          //COLLECTIONS

          if(req.url=="CollectionCreate"){
               CollectionCreate();
          }else if(req.url="CollectionDelete"){
               CollectionDelete();
          }


     });

})

//server.listen(port);

QuerySelect("Walletter","WT_USERS").then(resquery=>{
     console.log(resquery)
})

QuerySelect("Walletter","WT_TRANSACTIONS").then(resquery=>{
     console.log(resquery)
})
