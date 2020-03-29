const app = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});
const getUserById = () => {
    return new Promise ((resolve, reject)=> {
            pool.query('SELECT * from dostawcy ', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
    });
};

const postDostawcy = (idDost, nazwaFirmy, nazwaProduktu) => {

    return new Promise ((resolve, reject)=> {
        pool.query(`INSERT INTO dostawcy(id_dost, nazwa_firmy, produkt) values (${idDost}, '${nazwaFirmy}', '${nazwaProduktu}')`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('Dodano do bazy'));
        })
    });
};

const deleteDostawca = (idDost) => {
    return new Promise((resolve, reject) => {
        pool.query(`delete from dostawcy where id_dost = ${idDost}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('usunięto'))
        })
    })
}
//getUserById();
module.exports.getUserById = getUserById;
module.exports.deleteDostawca = deleteDostawca;
module.exports.postDostawcy = postDostawcy;