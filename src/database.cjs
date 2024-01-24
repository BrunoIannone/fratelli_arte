const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    port:3306,
    user:'root', 
    password: 'Recalcitranza1!',
    connectionLimit: 5,
    database:"fratelli_arte"
});

async function recoverUserData() {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SELECT last_name, id_fidelity_card FROM customer WHERE last_name = 'Iannone'");
    console.log(res); // Output may vary based on your database response
    return res;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
      console.log("Connection closed");
    }
  }
}

async function addUser(formData) {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.beginTransaction();

    const id = await insertFidelityCard(conn);

    await insertCustomer(conn, formData, id);

    await conn.commit();
    
    return true;
  } catch (err) {
    if (conn) {
      await conn.rollback();
    }
    throw err;
  } finally {
    if (conn) {
      conn.release();
      console.log("Connection released");
    }
  }
}

async function insertFidelityCard(conn) {
  const query = "INSERT INTO fidelity_card () VALUES ()";
  const res = await conn.query(query);
  console.log(parseInt(res.insertId, 10));
  return parseInt(res.insertId, 10);
}

async function insertCustomer(conn, formData, id) {
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
  const res = await conn.query(query, values);
  console.log(parseInt(res.insertId, 10));
}





module.exports = {
  recoverUserData,
  addUser
};
