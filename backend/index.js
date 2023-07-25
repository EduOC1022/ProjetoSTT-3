const express = require('express');
const {Pool} = require('pg');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const bd = new Pool({
    user: 'postgres',
    password: 's3nh@BD!',
    host: '150.162.67.194',
    port: 5432,
    database: 'projetostt'
}); 

bd.connect();
console.log("Cliente foi conectado");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index2.html');
});

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
  const ano = req.params.ano;

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
  const local = req.params.local;

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
  const km = req.params.km;

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
  const valor = req.params.valor;

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

app.post('/db', async (req, res) => {
  try {
    const { marca, modelo, versao, ano, local, km, valor, placa, desconto } = req.body;

    // Executar a query SQL para inserir os dados no banco de dados
    const query = 'INSERT INTO carros (marca, modelo, versao, ano, local, km, valor, placa, desconto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    await bd.query(query, [marca, modelo, versao, ano, local, km, valor, placa, desconto]);

    res.status(201).json({ message: 'Recurso criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o recurso' });
  }
});


app.delete('/db', async (req, res) => {
  try {
    const { id } = req.body;

    // Executar a query SQL para excluir o registro do banco de dados
    const query = 'DELETE FROM carros WHERE id = $1';
    await bd.query(query, [id]);

    res.status(201).json({ message: 'Recurso excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o recurso' });
  }
});

app.put('/db', async (req, res) => {
  try {
    const { marca, modelo, versao, ano, local, km, valor, placa, desconto, id } = req.body;

    // Executar a query SQL para atualizar o carro no banco de dados
    const query =  'UPDATE carros SET marca = $1, modelo = $2, versao = $3, ano = $4, local = $5, km = $6, valor = $7, placa = $8, desconto = $9 WHERE id = $10';
    const values = [marca, modelo, versao, ano, local, km, valor, placa, desconto, id];
    await bd.query(query, values);

    res.json({ message: 'Carro atualizado com sucesso.' });
  } catch (ex) {
    console.log('Erro: ' + ex);
    res.status(500).send('Erro ao atualizar o carro.');
  }
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});
