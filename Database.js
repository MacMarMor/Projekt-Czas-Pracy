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

    static connect(collection)
    {
        return new Promise(function (resolve, reject) {
			const uri = "mongodb://SieciWWW:Sieci123@sieciwww-shard-00-00.ydgvt.mongodb.net:27017,sieciwww-shard-00-01.ydgvt.mongodb.net:27017,sieciwww-shard-00-02.ydgvt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t0v948-shard-0&authSource=admin&retryWrites=true&w=majority";
			const MongoClient = require('mongodb').MongoClient;
			//MongoClient = require('mongodb/lib/mongo_client').MongoClient;
			const dbname = "Test1";
            try {
                MongoClient.connect(uri, {}, (error, client)=>{
                    if (error) { 
                        console.log("not ok "+error);
                    } else {
                        const db = client.db(dbname);



                        db.collection(collection).find({}).toArray(function(err, result) 
                        {
                            if (err) throw err;

                            resolve(result);
//                            return result;
                        });
                    }
                })
            } catch (error) {
              console.error("error db");
              console.error(error);
            }
		});
    }


    getEmployees()
    {
        return new Promise(function (resolve, reject) {
		
			const promise = Database.connect("test1");

			promise.then(function(result) {
//				console.log("BAAAAAAAAAA " + result);
			});

			return promise;
		});
    }

    getSchedule()
	{
        return new Promise(function (resolve, reject) {
		
			const promise = Database.connect("grafik");

			promise.then(function(result) {
//				console.log("BAAAAAAAAAA " + result);
			});

			return promise;
		});
	}

}

module.exports = Database;









