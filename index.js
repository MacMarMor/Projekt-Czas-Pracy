const express = require('express');
const path = require('path');
const EmployeesScheduler = require('./EmployeesScheduler.js');  
const Database = require('./Database.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
app.get('/', (req, res) => res.render('pages/strona_logowanie'));
app.get('/sterowanie_aplikacji_ejs', (req, res) => res.render('pages/sterowanie_aplikacji'));
app.get('/grafik_ejs', (req, res) => res.render('pages/grafik'));
app.get('/generuj_grafik_ejs', (req, res) => res.render('pages/generuj_grafik'));
app.get('/czas_pracy_ejs', (req, res) => res.render('pages/czas_pracy'));
app.get('/archiwum_grafikow_ejs', (req, res) => res.render('pages/archiwum_grafikow'));
app.get('/absencje_ejs', (req, res) => res.render('pages/absencje'));
app.get('/db_ejs', (req, res) => res.render('pages/db'));
app.get('//wyloguj_ejs', (req, res) => res.render('pages/strona_logowanie'));
//
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



//loggin
app.post('/login', (req, res) => {
    //TODO: check data with db
    var user_name = req.body.user_name;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    
    if(user_name == "Admin" && password == "Admin") 
        res.render('pages/sterowanie_aplikacji')
    else
        res.render('pages/strona_logowanie')
});


//algorithm
app.post('/generate', (req, res) => {
    
    var EmpS = new EmployeesScheduler();
    var db = new Database();

    EmpS.updateEmployees(db.getEmployees());
    console.log(db.getEmployees());
    EmpS.updateMinimumStaff(db.getSchedule());
    //console.log()
    
    res.render('pages/generuj_grafik');
});


//baza danych
/*const MongoClient = require('mongodb').MongoClient
const dbname = "Test1";

class Date
{
    constructor(year, month, day)
    {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

class Time
{
    constructor(hour, minute, second, nano)
    {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.nano = nano;
    }
}

class startPracy {
    constructor(Date, Time) {
        this.date = Date;
        this.godzina = Time;
    }

}

class dniPracy {
    constructor(Date, Time, iloscPrzepracowanychGodzin)
    {
        this.startPracy = new startPracy(Date, Time);
        this.iloscPrzepracowanychGodzin = iloscPrzepracowanychGodzin;
    }
}


a = new dniPracy(new startPracy(new Date(2021, 10, 10), new Time(1, 0, 0, 0)), 8);

var uri = "mongodb://SieciWWW:Sieci123@sieciwww-shard-00-00.ydgvt.mongodb.net:27017,sieciwww-shard-00-01.ydgvt.mongodb.net:27017,sieciwww-shard-00-02.ydgvt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t0v948-shard-0&authSource=admin&retryWrites=true&w=majority";

try {
    MongoClient.connect(uri, {}, (error, client)=>{
        if (error) { 
            console.log("not ok "+error);
        } else {
            const db = client.db(dbname)
    
            query = {id:1}

            res = db.collection("test1").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
              });

            console.error("connect db");
        }
    })
} catch (error) {
  console.error("error db");
  console.error(error);
}*/
