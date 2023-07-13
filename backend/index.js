const express = require('express');
const {Pool} = require('pg');
const app = express();
const bd = new Pool({
    user: 'stt',
    password: 'stt123',
    host: 'localhost',
    port: 5432,
    database: 'sttproject'
});

bd.connect();
console.log("Cliente foi conectado");

bd.query('SELECT * FROM carros').then(results => {
    const resultados = results.rows;
    console.table(resultados);
});

app.get('/db', async (req, res) => {
    try {
      const pesquisa = 'SELECT * FROM carros';
      const resultados = await bd.query(pesquisa);
      const carros = resultados.rows;

      res.json(carros);
    } catch (ex) {
      console.log('Erro ao recuperar dados do banco de dados:', ex);
      res.status(500).send('Erro ao recuperar dados do banco de dados.');
    }
  });

  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});
