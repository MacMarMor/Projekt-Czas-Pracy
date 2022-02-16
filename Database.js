class Database
{
    uri;
    MongoClient;
    //MongoClient = require('mongodb/lib/mongo_client').MongoClient;
    dbname;

    constructor()
    {
        this.uri = "mongodb://SieciWWW:Sieci123@sieciwww-shard-00-00.ydgvt.mongodb.net:27017,sieciwww-shard-00-01.ydgvt.mongodb.net:27017,sieciwww-shard-00-02.ydgvt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t0v948-shard-0&authSource=admin&retryWrites=true&w=majority";
        
        this.MongoClient = require('mongodb').MongoClient;
        this.dbname = "Test1";
    }

    connect(collection)
    {
        resultret = null;
        try {
            this.MongoClient.connect(this.uri, {}, (error, client)=>{
                if (error) { 
                    console.log("not ok "+error);
                } else {
                    const db = client.db(this.dbname);
            
        
                    db.collection(collection).find({}).toArray(function(err, result) 
                    {
                        console.error("collection err: "+err);
                        if (err) throw err;
                        resultret = result;
                        //return result;
                    });

                    console.error("connect db");
                }
            })
        } catch (error) {
          console.error("error db");
          console.error(error);
        }
        return resultret;
    }


    getEmployees()
    {
        this.connect("test1");
    }

    getSchedule()
    {
        this.connect("grafik");
    }
}

module.exports = Database;









