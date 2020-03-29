const app = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});
const getProducts = () => {
    return new Promise ((resolve, reject)=> {
        pool.query('SELECT * from produkty_kupione', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const getProductsSkladniki = () => {
    return new Promise ((resolve, reject)=> {
        pool.query('SELECT * from produkty_skladniki', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const postProdukty = (idProd, nazwaProduktu, ilosc, cena) => {

    return new Promise ((resolve, reject)=> {
        pool.query(`INSERT INTO produkty_kupione(id_prod, nazwa, ilosc, cena) values (${idProd}, '${nazwaProduktu}', ${ilosc}, ${cena})`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('Dodano do bazy'));
        })
    });
};
const postProduktySkladniki = (idProd, skladnik1, skladnik2, skladnik3) => {

    return new Promise ((resolve, reject)=> {
        pool.query(`INSERT INTO produkty_skladniki(id_prod, skladnik1, skladnik2, skladnik3) values (${idProd}, '${skladnik1}', '${skladnik2}', '${skladnik3}')`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('Dodano do bazy'));
        })
    });
};

const deleteProdukty = (idProd) => {
    return new Promise((resolve, reject) => {
        pool.query(`delete from produkty_kupione where id_prod = ${idProd}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('usunięto'))
        })
    })
}
const deleteProduktySkladniki = (idProd) => {
    return new Promise((resolve, reject) => {
        pool.query(`delete from produkty_skladniki where id_prod = ${idProd}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('usunięto'))
        })
    })
}
module.exports.getProducts = getProducts;
module.exports.getProductsSkladniki = getProductsSkladniki;
module.exports.postProdukty = postProdukty;
module.exports.postProduktySkladniki = postProduktySkladniki;
module.exports.deleteProdukty = deleteProdukty;
module.exports.deleteProduktySkladniki = deleteProduktySkladniki;

