const express = require("express");
const bd = require("./database/connection");
const cors = require("cors");


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
}));

app.get("/api/user/:id", (req, res) => {
    var userId = req.params.id;
    var query = `SELECT * FROM bdcarona.passageiro AS user WHERE user.CPF = "${userId}"`;

    bd.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})