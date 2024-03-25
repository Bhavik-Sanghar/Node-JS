require('dotenv').config();

var mysql = require("mysql");

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // Create (Insert) operation
  // var sql = "INSERT INTO employee (FirstName, LastName, Age, Department) VALUES ('Bob', 'Nolan', 18, 'Medical')";
  // con.query(sql, (err, data) => {
  //     if (err) throw err;
  //     console.log("Number of rows inserted: " + data.affectedRows);
  // });

  // Read (Select) operation
  var sql = "SELECT * FROM employee";
  con.query(sql, (err, data) => {
    if (err) throw err;
    console.log("Retrieved data:");
    console.table(data);
  });

  // Delete operation
  // var sq = "DELETE FROM employee WHERE EmployeeID = 17";
  // con.query(sq, (err, result) => {
  //   if (err) throw err;
  //   console.log("Number of rows deleted: " + result.affectedRows);
  // });
});
