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

async function addFidelityCard() {
  let conn;
  try {    
    const values = [, , , ]; 

    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO fidelity_card () values ()");
    console.log(res); //[ {val: 1}, meta: ... ]
    //return res;
    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn)  conn.end(); 
  }
}
async function addUser(formData, res) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query_card = "INSERT INTO fidelity_card () VALUES ()";
    var res = await conn.query(query_card);
    console.log(parseInt(res.insertId, 10));
    id = parseInt(res.insertId, 10)
    const query = "INSERT INTO customer (first_name, last_name, address, email, id_fidelity_card, telephone_number, cap, date_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      formData.first_name,
      formData.last_name,
      formData.address,
      formData.email,
      id,
      formData.telephone_number,
      formData.cap,
      formData.date_birth
    ];
    //console.log(query);

    
    res = await conn.query(query, values);
    console.log(parseInt(res.insertId, 10));
    conn.end();
    return true;
  } catch (err) {
    throw err;
  } finally {
    if (conn)  conn.end(); console.log("CHIUSO");
  }
  
}


module.exports = {
  asyncFunction,
  addFidelityCard,
  addUser
};
