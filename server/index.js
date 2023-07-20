const express = require("express");
const bd = require("./database/connection");
const cors = require("cors");

const PORT = 3001;

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
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

app.get("/api/motorista/:id/historico", (req, res) => {
  var motoristaId = req.params.id;
  var query = `
    SELECT v.Data, v.Hora, v.Origem, v.Destino, m.Nome AS NomeMotorista, v.Preco
    FROM bdcarona.viagem AS v
    JOIN bdcarona.realiza AS r ON r.ViagemID = v.ViagemID
    JOIN bdcarona.motorista AS m ON m.CNHmotorista = v.idMotorista
    WHERE v.idMotorista = "${motoristaId}";
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
  SELECT  
  m.Nome,
  e.Cidade,
  m.Classificacao,
  COUNT(v.ViagemID) AS NumeroCorridas
FROM bdcarona.motorista AS m
LEFT JOIN bdcarona.viagem AS v ON m.CNHmotorista = v.idMotorista
LEFT JOIN bdcarona.endereco AS e ON m.CNHmotorista = e.idMotorista
GROUP BY m.CNHmotorista, m.Nome, e.Cidade
HAVING COUNT(v.ViagemID) > (
  SELECT 
      AVG(NumeroCorridas)
  FROM (
      SELECT 
          COUNT(ViagemID) AS NumeroCorridas
      FROM bdcarona.motorista AS m
      LEFT JOIN bdcarona.viagem AS v ON m.CNHmotorista = v.idMotorista
      GROUP BY m.CNHmotorista
  ) AS subconsulta
)
ORDER BY Classificacao desc, NumeroCorridas DESC
limit 5;
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/passageiros-mais-viagens", (req, res) => {
  var query = `
    SELECT p.Nome AS Nome, p.CPF, e.Cidade, COUNT(r.ViagemID) AS NumeroDeViagens
    FROM bdcarona.passageiro p
    LEFT JOIN bdcarona.realiza r ON p.CPF = r.CPF
    LEFT JOIN bdcarona.endereco AS e ON e.idPassageiro = p.CPF
    GROUP BY p.CPF, e.Cidade
    ORDER BY NumeroDeViagens DESC
    LIMIT 5;
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
})

app.get("/api/passageiro/:cpf/imagem-perfil", (req, res) => {
  var passageiroId = req.params.cpf;

  var query = `
    SELECT nome, ImagemPerfil
    FROM bdcarona.passageiro as passageiro
    WHERE passageiro.CPF = "${passageiroId}";
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/media-caronas", (req, res) => {
  var query = `
    SELECT YEAR(viagem.Data) AS Ano, MONTH(viagem.Data) AS Mes, COUNT(*) / COUNT(DISTINCT p.CPF) AS MediaCaronas
    FROM bdcarona.viagem
    JOIN bdcarona.realiza as r ON r.ViagemID = viagem.ViagemID 
    JOIN bdcarona.passageiro as p ON p.CPF = r.CPF
    GROUP BY YEAR(viagem.Data), MONTH(viagem.Data)
    ORDER BY Mes;
  `;

  bd.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/numero-caronas/:cpf", (req, res) => {
  var passageiroId = req.params.cpf;
  var query = `
    SELECT YEAR(v.Data) AS Ano, MONTH(v.Data) AS Mes, COUNT(*) AS NumeroCorridas
    FROM bdcarona.viagem AS v
    JOIN bdcarona.realiza AS r ON r.ViagemID = v.ViagemID 
    WHERE r.CPF = "${passageiroId}"
    GROUP BY YEAR(v.Data), MONTH(v.Data)
    ORDER BY Mes;
  `;
  bd.query(query, [motorista], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/api/passageiro/:cpf/historico", (req, res) => {
  var passageiroId = req.params.id;
  var query = `
    SELECT v.Data, v.Hora, v.Origem, v.Destino, m.Nome AS NomeMotorista, v.Preco
    FROM bdcarona.viagem AS v
    JOIN bdcarona.realiza AS r ON r.ViagemID = v.ViagemID
    JOIN bdcarona.motorista AS m ON m.CNHmotorista = v.idMotorista
    WHERE r.CPF = "${passageiroId}";
  `;

  bd.query(query, [userId], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
