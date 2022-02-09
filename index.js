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