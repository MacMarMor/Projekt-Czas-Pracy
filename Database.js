class Database
{
    uri = "mongodb://SieciWWW:Sieci123@sieciwww-shard-00-00.ydgvt.mongodb.net:27017,sieciwww-shard-00-01.ydgvt.mongodb.net:27017,sieciwww-shard-00-02.ydgvt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t0v948-shard-0&authSource=admin&retryWrites=true&w=majority";
    MongoClient = require('mongodb').MongoClient;
    //MongoClient = require('mongodb/lib/mongo_client').MongoClient;
    dbname = "Test1";

    constructor()
    {
        this.uri = "mongodb://SieciWWW:Sieci123@sieciwww-shard-00-00.ydgvt.mongodb.net:27017,sieciwww-shard-00-01.ydgvt.mongodb.net:27017,sieciwww-shard-00-02.ydgvt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t0v948-shard-0&authSource=admin&retryWrites=true&w=majority";
        
        this.MongoClient = require('mongodb').MongoClient;
        this.dbname = "Test1";
    }

    static connect(collection)
    {
            try {
                MongoClient.connect(this.uri, {}, (error, client)=>{
                    if (error) { 
                        console.log("not ok "+error);
                    } else {
                        const db = client.db(this.dbname);

                        console.error("connect db1");


                        db.collection(collection).find({}).toArray(function(err, result) 
                        {
                            console.error("collection err: "+err);
                            if (err) throw err;

                            console.error("connect db2");
                            console.error("collection result: "+result);
                            resolve(result);
                            //return result;
                        });




                        console.error("connect db3");
                    }
                })
            } catch (error) {
              console.error("error db");
              console.error(error);
            }
    }


    getEmployees()
    {
        const promise = new Promise(function (resolve, reject) {
            resolve (Database.connect("test1"))}
                                   );
        console.log("YAAAAAAAAAA " + promise);
        promise.then(function(result) {console.log("BAAAAAAAAAA " + result);});
    // here you can use the result of promiseB

        return promise;
    }

    getSchedule()
    {
        return this.connect("grafik");
    }
}

module.exports = Database;









