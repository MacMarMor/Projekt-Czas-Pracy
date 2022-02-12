const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

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
//
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



//loggin
app.post('/login', (req, res) => {
    //check data with db
    res.render('pages/sterowanie_aplikacji_ejs')
});

//baza danych
const MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://SieciWWW:Sieci123@sieciwww.ydgvt.mongodb.net/test"
const dbname = "Test1"

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

console.log("test log")
a = new dniPracy(new startPracy(new Date(2021, 10, 10), new Time(1, 0, 0, 0)), 8);

//MongoClient.connect(url, {}, (error, client)=>{
//    if (error) { console.log("not ok")}
//console.log("almoost ok")
//    const db = client.db(dbname)
//
//    query = {id:1}
//
//    res = db.collection("test1").find({}).toArray(function(err, result) {
//        if (err) throw err;
//        console.log(result);
//      });
//
//})
