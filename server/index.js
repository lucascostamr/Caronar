const express = require("express");
const bd = require("./database/connection");
const cors = require("cors");

const PORT = 3000;

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

app.get("/api/motorista/:id/historico", (req, res) => {
    const motoristaId = req.params.id;
    const query = `SELECT v.* FROM motorista m
                 JOIN viagem v ON m.CNHmotorista = v.idMotorista
                 WHERE m.CNHmotorista = "${motoristaId}"`;

    bd.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(data);
    });
});


app.get("/api/passageiro/555.555.555-55/historico", () => {

    const query = `SELECT v.* FROM passageiro p
                   JOIN realiza r ON p.CPF = r.CPF
                   JOIN viagem v ON r.ViagemID = v.ViagemID
                   WHERE p.CPF = '555.555.555-55'`;
  
    bd.query(query, [cpfPassageiro], function (err, result, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao obter histórico de viagens do passageiro" });
      } else {
        res.json(result);
      }
    });
  });
  







app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})