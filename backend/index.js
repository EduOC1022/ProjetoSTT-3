const express = require('express');
const {Pool} = require('pg');
const app = express();
const bd = new Pool({
    user: 'postgres',
    password: 's3nh@BD!',
    host: '150.162.67.194',
    port: 5432,
    database: 'sttproject'
}); 

bd.connect();
console.log("Cliente foi conectado");

// mostra a tabela no terminal
bd.query('SELECT * FROM carros').then(results => {
    const resultados = results.rows;
    console.table(resultados);
});

// GET 

// mostra o banco de dados inteiro
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

// procura por id
app.get('/id/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const query = 'SELECT * FROM carros WHERE id = $1';
    const values = [id];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows[0];

    if (carro) {
      res.json(carro);
    } else {
      res.status(404).send('Carro não encontrado.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por marca 
app.get('/db/:marca', async (req, res) => {
  const marca = req.params.marca;

  try {
    const query = 'SELECT * FROM carros WHERE marca = $1';
    const values = [marca];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com essa marca.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por modelo
app.get('/modelo/:modelo', async (req, res) => {
  const modelo = req.params.modelo;

  try {
    const query = 'SELECT * FROM carros WHERE modelo = $1';
    const values = [modelo];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com esse modelo.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por versao
app.get('/versao/:versao', async (req, res) => {
  const versao = req.params.versao;

  try {
    const query = 'SELECT * FROM carros WHERE versao = $1';
    const values = [versao];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com essa versão.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por ano 
app.get('/ano/:ano', async (req, res) => {
  const ano = req.params.versao;

  try {
    const query = 'SELECT * FROM carros WHERE ano = $1';
    const values = [ano];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com esse ano.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por local 
app.get('/local/:local', async (req, res) => {
  const local = req.params.versao;

  try {
    const query = 'SELECT * FROM carros WHERE local = $1';
    const values = [local];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com esse local.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por km
app.get('/km/:km', async (req, res) => {
  const km = req.params.versao;

  try {
    const query = 'SELECT * FROM carros WHERE km = $1';
    const values = [km];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com essa quilometragem.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

// procura por valor
app.get('/valor/:valor', async (req, res) => {
  const valor = req.params.versao;

  try {
    const query = 'SELECT * FROM carros WHERE valor = $1';
    const values = [valor];
    const resultados = await bd.query(query, values);
    const carro = resultados.rows;

    if (carro.length > 0) {
      res.json(carro);
    } else {
      res.status(404).send('Nenhum carro encontrado com esse valor.');
    }
  } catch (ex) {
    console.log('Erro ao recuperar dados do banco de dados:', ex);
    res.status(500).send('Erro ao recuperar dados do banco de dados.');
  }
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});
