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
  var query = "SELECT * FROM bdcarona.passageiro AS user WHERE user.CPF = ?";

  bd.query(query, [userId], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/user/:id/historico", (req, res) => {
  var userId = req.params.id;
  var query = `
    SELECT v.Data, v.Hora, v.Origem, v.Destino, m.Nome AS NomeMotorista, v.Preco
    FROM bdcarona.viagem AS v
    JOIN bdcarona.realiza AS r ON r.ViagemID = v.ViagemID
    JOIN bdcarona.motorista AS m ON v.idMotorista = m.CNHmotorista
    WHERE r.CPF = ?
  `;

  bd.query(query, [userId], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/viagens/ativas", () => {
  var query = `
    SELECT *
    FROM bdcarona.viagem
    WHERE ativo = 1
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
