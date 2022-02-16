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
app.get('/generate', (req, res) => {
    
    var EmpS = new EmployeesScheduler();
    var db = new Database();

	var promise = db.getEmployees();
	promise.then(function(json) {
        EmpS.updateEmployees(json);
	});
	
	var j;
	var promise2 = db.getSchedule();
	promise2.then(function(json) {
        EmpS.updateMinimumStaff(json);
		j = json;
	});
	
	
	//TODO: Send data to client
	
    //res.render('pages/generuj_grafik');
    res.send(j);
});
