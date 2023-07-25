const express = require('express');
const expressapp = express();
const bodyParser = require('body-parser');
expressapp.use(bodyParser.urlencoded({ extended: false }));
expressapp.use(express.json());

const { Client } = require('pg');
const cliente = new Client({
  user: "postgres",
  password: "s3nh@BD!",
  host: "150.162.67.194",
  port: "5432",
  database: "projetostt"
});

cliente.connect();
console.log("Cliente foi conectado");

// rota html

// expressapp.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });



expressapp.post('/db', async (req, res) => {
  try {
    const { marca, modelo, versao, ano, local, km, valor, placa, desconto } = req.body;

    // Executar a query SQL para inserir os dados no banco de dados
    const query = 'INSERT INTO carros (marca, modelo, versao, ano, local, km, valor, placa, desconto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    await cliente.query(query, [marca, modelo, versao, ano, local, km, valor, placa, desconto]);

    res.status(201).json({ message: 'Recurso criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o recurso' });
  }
});


expressapp.delete('/db', async (req, res) => {
  try {
    const { id } = req.body;

    // Executar a query SQL para excluir o registro do banco de dados
    const query = 'DELETE FROM carros WHERE id = $1';
    await cliente.query(query, [id]);

    res.status(201).json({ message: 'Recurso excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o recurso' });
  }
});

expressapp.put('/db', async (req, res) => {
  try {
    const { marca, modelo, versao, ano, local, km, valor, placa, desconto, id } = req.body;

    // Executar a query SQL para atualizar o carro no banco de dados
    const query =  'UPDATE carros SET marca = $1, modelo = $2, versao = $3, ano = $4, local = $5, km = $6, valor = $7, placa = $8, desconto = $9 WHERE id = $10';
    const values = [marca, modelo, versao, ano, local, km, valor, placa, desconto, id];
    await cliente.query(query, values);

    res.json({ message: 'Carro atualizado com sucesso.' });
  } catch (ex) {
    console.log('Erro: ' + ex);
    res.status(500).send('Erro ao atualizar o carro.');
  }
});

expressapp.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});