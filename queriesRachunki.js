const app = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});
const getRachnuki = () => {
    return new Promise ((resolve, reject)=> {
        pool.query('SELECT * from rachunki', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const getStatusRachunku = () => {
    return new Promise ((resolve, reject)=> {
        pool.query('SELECT * from status_rachunku', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const postRachunki = (idRach, zaplacone, potwierdzone, rok, miesiac, koszt ) => {
    return new Promise ((resolve, reject)=> {
        pool.query(`INSERT INTO status_rachunku(id_rachunku, zaplacone, potwierdzone) values (${idRach}, ${zaplacone}, ${potwierdzone}); 
                    INSERT INTO rachunki(id_rachunku, rok, miesiąc,koszt ) values (${idRach}, ${rok}, ${miesiac}, ${koszt})`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    });
};
const deleteRachunki = (idRach) => {
    return new Promise((resolve, reject) => {
        pool.query(`delete from rachunki where id_rachunku = ${idRach}; 
                    delete from status_rachunku where id_rachunku = ${idRach}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(console.log('usunięto'))
        })
    })
}
module.exports.getRachnuki = getRachnuki;
module.exports.getStatusRachunku = getStatusRachunku;
module.exports.postRachunki = postRachunki;
module.exports.deleteRachunki = deleteRachunki;