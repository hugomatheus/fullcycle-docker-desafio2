const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`);

app.get('/', (req, res) => {
    const name = `User${Math.floor(Math.random() * 1000)}`;
    connection.query(`INSERT INTO people(name) values('${name}')`);

    connection.query(`SELECT name FROM people`, (err, results) => {
        if (err) throw err;
        const names = results.map(row => row.name).join('<br>');
        res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
