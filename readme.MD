# Byngo

Is a web client executor for Mongo DB.

Like a SQL Management Studio but for Mongo instead of SQL-Server.


[idea](./docs/IDEA.png)

## Actions (CRUD)

### QUERIES
#### SELECT

We have to replicate these queries.
`SELECT * FROM TABLE` || `SELECT TOP 100 FROM TABLE` || `SELECT @PAR FROM TABLE WHERE @PAR2=@VALUE` 
> Group by, order by --> After we get the data


#### INSERT
`INSERT INTO TABLE VALUES(@OBJECT)`


#### INSERT/UPDATE
```SQL
IF(@OBJECT.PK EXISTS)
     UPDATE TABLE SET @OBJECT=@NEWOBJECT WHERE TAB.PK=@OBJECT.PK
ELSE
     INSERT INTO TABLE VALUES(@OBJECT)
```
#### UPDATE
`UPDATE TABLE SET @OBJECT=@NEWOBJECT WHERE ID=@ID`

#### DELETE

     - MANY --> `DELETE FROM TABLE WHERE ID=@ID` 
     - ALL/FLUSH --> `DELETE FROM TABLE`


### COLLECTIONS

- CREATE 
- DELETE