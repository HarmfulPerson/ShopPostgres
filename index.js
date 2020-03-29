const express = require('express');
const queriesDostawcy = require('./queriesDostawcy');
const queriesProdukty = require('./queriesProdukty');
const queriesPracownicy = require('./queriesPracownicy');
const queriesRachunki = require('./queriesRachunki');
const app = express();


const bodyParser = require("body-parser")

app.engine('html', require('ejs').renderFile);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/dostawcy', async (req, res, next) => {
    try {
        let getDostawcy = await queriesDostawcy.getUserById();
        return res.render('dostawcy/dostawcy',{obj: getDostawcy});
        res.status(200).json({
            result: 'ok'
        })
    } catch(err) {
        next(err)
    }
});
app.get('/pracownicy', async (req, res, next) => {
    try {
        let getPracownicy = await queriesPracownicy.getPracownicy();
        return res.render('pracownicy/pracownicy',{obj: getPracownicy});
        res.status(200).json({
            result: 'ok'
        })
    } catch(err) {
        next(err)
    }
});
app.get('/pracownicy/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        let getPozycjaPracownikInformations = await queriesPracownicy.getPozycjaPracownikInformations(id);
        let getGodzinyPracownikInformations = await queriesPracownicy.getGodzinyPracownikInformations(id);
        let getUrlopPracownikInformations = await queriesPracownicy.getUrlopPracownikInformations(id);
        console.log(getPozycjaPracownikInformations)
        return res.render('pracownicy/singlePracownik',{
            pozycja: getPozycjaPracownikInformations,
            godziny: getGodzinyPracownikInformations,
            urlop: getUrlopPracownikInformations
        });
        res.status(200).json({
            result: 'ok'
        })
    } catch(err) {
        next(err)
    }
});
app.get('/produkty', async (req, res, next) => {
    try {
        let getProducts = await queriesProdukty.getProducts();
        let getProductsSkladniki = await queriesProdukty.getProductsSkladniki();

        return res.render('produkty/produkty',{produkty: getProducts, skladniki: getProductsSkladniki});
        res.status(200).json({
            result: 'ok'
        })
    } catch(err) {
        next(err)
    }
});
app.get('/rachunki', async (req, res, next) => {
    try {
        let getRachnuki = await queriesRachunki.getRachnuki();
        let getStatus = await queriesRachunki.getStatusRachunku();
        console.log(getStatus[0].zaplacone);
        return res.render('rachunki/rachunki',{rachunki: getRachnuki, statusRachunku: getStatus});
        res.status(200).json({
            result: 'ok'
        })
    } catch(err) {
        next(err)
    }
});
app.post('/produkty',async (req, res, next) => {
    try {
        let updatedProdukty = await queriesProdukty.postProdukty(req.body.idProd, req.body.nazwaProduktu, req.body.ilosc, req.body.cena);
        let updatedProduktySkladniki = await queriesProdukty.postProduktySkladniki(req.body.idProd, req.body.skladnik1, req.body.skladnik2, req.body.skladnik3);
        res.redirect('/produkty')
    }
    catch(err) {
        next(err);
    }
})
app.post('/rachunki',async (req, res, next) => {
    try {
        console.log(req.body.idRach, req.body.zaplacone, req.body.potwierdzone, req.body.rok, req.body.miesiac, req.body.koszt)
        let updatedRachunki = await queriesRachunki.postRachunki(req.body.idRach, req.body.zaplacone, req.body.potwierdzone, req.body.rok, req.body.miesiac, req.body.koszt);
        res.redirect('/rachunki')
    }
    catch(err) {
        next(err);
    }
})
app.post('/dostawcy',async (req, res, next) => {
    try {
        let updatedDostawcy = await queriesDostawcy.postDostawcy(req.body.idDost, req.body.nazwaFirmy, req.body.produkt);
        res.redirect('/dostawcy')
    }
    catch(err) {
        next(err);
    }
})
app.post('/pracownicy',async (req, res, next) => {
    try {
        let updatedPracownicy = await queriesPracownicy.postPracownicy(req.body.idPrac, req.body.imiePracownika, req.body.nazwiskoPracownika, req.body.pozycjaPracownika,
        req.body.przepracowaneGodziny, req.body.stawkaGodzinowa, req.body.urlop, req.body.wyplata);
        res.redirect('/dostawcy')
    }
    catch(err) {
        next(err);
    }
})
app.delete('/dostawcy', async(req, res, next) => {
    try {
        let deleteDostawca = await queriesDostawcy.deleteDostawca(req.body.idDost);
    }
    catch(err){
        next(err);
    }
})
app.delete('/pracownicy', async(req, res, next) => {
    try {
        let deletePracownik = await queriesPracownicy.deletePracownik(req.body.idPrac);
    }
    catch(err){
        next(err);
    }
})
app.delete('/rachunki', async(req, res, next) => {
    try {
        let deleteRachunek = await queriesRachunki.deleteRachunki(req.body.idRach);
    }
    catch(err){
        next(err);
    }
})
app.delete('/produkty', async(req, res, next) => {
    try {
        let deleteProdukt = await queriesProdukty.deleteProdukty(req.body.idProd);
        let deleteProduktSkladniki = await queriesProdukty.deleteProduktySkladniki(req.body.idProd);
    }
    catch(err){
        next(err);
    }
})
app.listen(3000, () => console.log('listening at port 3000'));