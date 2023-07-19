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
  console.log(query);
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
    WHERE r.CPF = "${userId}"
  `;

  bd.query(query, [userId], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/viagens/ativas", (req, res) => {
  var query = `
    SELECT v.Origem, v.Destino, m.Nome AS NomeMotorista, c.Modelo AS ModeloCarro, m.Classificacao, v.Preco
    FROM bdcarona.viagem AS v
    JOIN bdcarona.motorista AS m ON v.idMotorista = m.CNHmotorista
    JOIN bdcarona.carro AS c ON m.CarroAtual = c.Placa
    WHERE v.ativo = 1
    LIMIT 10
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/valor-medio-viagem", (req, res) => {
  var query = `
    SELECT YEAR(Data) AS Ano, MONTH(Data) AS Mes, COUNT(*) AS QuantidadeViagens, AVG(Preco) AS ValorMedio
    FROM bdcarona.viagem
    GROUP BY YEAR(Data), MONTH(Data)
    ORDER BY Mes
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/numero-corridas/:motorista", (req, res) => {
  var motorista = req.params.motorista;
  var query = `
    SELECT YEAR(viagem.Data) AS Ano, MONTH(viagem.Data) AS Mes, COUNT(*) AS NumeroCorridas
    FROM bdcarona.viagem
    JOIN bdcarona.motorista ON viagem.idMotorista = motorista.CNHmotorista
    WHERE motorista.CNHmotorista = ?
    GROUP BY YEAR(viagem.Data), MONTH(viagem.Data)
    ORDER BY Mes
  `;
  bd.query(query, [motorista], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/media-corridas", (req, res) => {
  var query = `
    SELECT YEAR(viagem.Data) AS Ano, MONTH(viagem.Data) AS Mes, COUNT(*) / COUNT(DISTINCT motorista.CNHmotorista) AS MediaCorridas
    FROM bdcarona.viagem
    JOIN bdcarona.motorista ON viagem.idMotorista = motorista.CNHmotorista
    GROUP BY YEAR(viagem.Data), MONTH(viagem.Data)
    ORDER BY Mes
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/motorista/:cnh/imagem-perfil", (req, res) => {
  var cnh = req.params.cnh;

  var query = `
    SELECT nome, classificacao, ImagemPerfil
    FROM bdcarona.motorista
    WHERE CNHmotorista = ?
  `;

  bd.query(query, [cnh], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/melhores-motoristas", (req, res) => {
  var query = `
    SELECT m.Nome, e.Cidade, m.Classificacao, COUNT(v.ViagemID) AS NumeroCorridas
    FROM bdcarona.motorista AS m
    JOIN bdcarona.endereco AS e ON m.CNHmotorista = e.idMotorista
    JOIN bdcarona.viagem AS v ON m.CNHmotorista = v.idMotorista
    WHERE m.CNHmotorista IN (
      SELECT v.idMotorista
      FROM bdcarona.viagem AS v
      GROUP BY v.idMotorista
      HAVING COUNT(*) > (
        SELECT AVG(contagem)
        FROM (
          SELECT COUNT(*) AS contagem
          FROM bdcarona.viagem AS v
          GROUP BY v.idMotorista
        )  AS viagens
      )
    )
    GROUP BY m.CNHmotorista, m.Nome, e.Cidade, m.Classificacao
    ORDER BY m.Classificacao DESC
    LIMIT 5
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/melhores-passageiros", (req, res) => {
  var query = '';

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
})

app.get("/api/passageiro/:cpf/imagem-perfil", (req, res) => {
  var cnh = req.params.cnh;

  var query = `
    SELECT nome, classificacao, ImagemPerfil
    FROM bdcarona.passageiro as passageiro
    WHERE passageiro.CPF = ?
  `;

  bd.query(query, [cnh], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
