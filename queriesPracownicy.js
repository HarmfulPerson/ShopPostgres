const app = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});
const getPracownicy = () => {
    return new Promise ((resolve, reject)=> {
        pool.query('SELECT * from zatrudnieni_pracownicy', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const getPozycjaPracownikInformations = (id) => {
    return new Promise ((resolve, reject)=> {
        pool.query(`SELECT * from pracownicy_pozycja where id_prac = ${id}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const getGodzinyPracownikInformations = (id) => {
    return new Promise ((resolve, reject)=> {
        pool.query(`SELECT * from pracownicy_godziny where id_prac = ${id}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const getUrlopPracownikInformations = (id) => {
    return new Promise ((resolve, reject)=> {
        pool.query(`SELECT * from urlopy where id_prac = ${id}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const deletePracownik = (idPrac) => {
    return new Promise((resolve, reject) => {
        pool.query(`delete from pracownicy_godziny where id_prac = ${idPrac}; delete from pracownicy_pozycja where id_prac = ${idPrac};
        delete from urlopy where id_prac = ${idPrac}; delete from zatrudnieni_pracownicy where id_prac = ${idPrac}; `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('usunięto'))
        })
    });
}
const postPracownicy = (idPrac, imie, nazwisko, pozycja, godziny, stawka, urlop, wyplata) => {

    return new Promise ((resolve, reject)=> {
        pool.query(`INSERT INTO zatrudnieni_pracownicy(id_prac, imie, nazwisko) values (${idPrac}, '${imie}', '${nazwisko}');
                    INSERT INTO pracownicy_godziny(id_prac, ilosc_godzin, stawka, pensja_brutto) values (${idPrac}, ${godziny}, ${stawka}, ${wyplata});
                    INSERT INTO pracownicy_pozycja(id_prac, pozycja) values (${idPrac}, '${pozycja}');
                    INSERT INTO urlopy(id_prac, pozostałe_dni) values (${idPrac}, '${urlop}');
                `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('Dodano do bazy'));
        })
    });
};
module.exports.getPracownicy = getPracownicy;
module.exports.getPozycjaPracownikInformations = getPozycjaPracownikInformations;
module.exports.getGodzinyPracownikInformations = getGodzinyPracownikInformations;
module.exports.getUrlopPracownikInformations = getUrlopPracownikInformations;
module.exports.deletePracownik = deletePracownik;
module.exports.postPracownicy = postPracownicy;