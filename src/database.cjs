const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    port:3306,
    user:'root', 
    password: 'Recalcitranza1!',
    connectionLimit: 5,
    database:"fratelli_arte"
});

async function asyncFunction() {
  let conn;
  let res;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SELECT last_name,id_fidelity_card from customer where last_name = 'Iannone'");
    console.log(res); //[ {val: 1}, meta: ... ]
    return res;
    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn)  conn.end(); 
  }
}

module.exports = {
  asyncFunction
};
