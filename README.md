# ProjetoSTT-3

O projeto se trata de uma API rest que dividimos em partes para melhorar o desenvolvimento. 

1. Criamos um servidor de banco de dados utilizando PostgreSQL e disponibilizamos o servidor
   para que todos envolvidos no projeto conseguissem utilizá-lo durante o desenvolvimento.
   Passo a passo do processo de configuração do bd PostgreSQL pra fazer esse projeto:

   1 abrir terminal digitar "sudo nano /etc/postgresql/14/main/postgresql.conf" para editar
   o arquivo de configuração do postgresql: * colocar as linhas sem as aspas ("")
    1.1 localizar dentro desse arquivo a linha "#listen_addresses = 'localhost'";
    1.2 logo abaixo dessa linha colocar "listen_addresses = '*'";

   2 abrir o terminal e digitar "sudo nano /etc/postgresql/14/main/pg_hba.conf" para configurar
    as regras de acesso no PostgreSQL:
    2.1 no final do arquivo adicionar a seguinte linha "host all all all md5" (correto)

   3 reiniciar o PostgreSQL com o comando "sudo service postgresql restart";

   4 se estiver usando algum firewall pode ser necessário abrir a porta do firewall, nesse
   caso não foi necessário;

   5 criar o banco de dados pelo PGAdmin4 e disponibilizei pros outros envolvidos;

   OBS: Esse processo foi executado em uma máquina com linux mint 21.1.

   Para outro computador poder se conectar ao servidor, deve-se adicionar um novo servidor ao
   PostgreSQL adicionando os seguintes dados:
     servers -> register -> server -> Connection:
     Hostname/address - 150.162.67.194
     Port - 5432
     Username - postgres
     Password - s3nh@BD!
   (Dados para conectar à máquina L1 do lab)

4. Elaboramos os códigos com as rotas que acreditamos serem necessários para o site:
   
   - Create: um POST, que deve ser executado a partir do formulário HTML. O formulário
     deve ser aberto ao digitar "localhost:3000" na barra de busca do navegador
     e serve para adicionar os dados de novos carros ao banco de dados.
     
   - Read: elaboramos 10 GETs:
     . Um que serve para abrir o arquivo HTML que possui o formulário conectado ao
     POST e será ativado quando digitarmos "localhost:3000".
     . Um que recupera a tabela completa do banco de dados quando digitarmos
     "localhost:3000/db".
     . Um que recupera um registro específico de acordo com o id digitado pelo usuário
     "localhost:3000/id/:id".
     . Um para cada atributo dado a um carro registrado no banco de dados, que está contido
     na parte de busca busca do site de acordo com o front (marca, modelo, versao, ano, local,
     km, e valor). Parâmetros utilizados para a busca:
     marca - localhost:3000/marca/:marca;
     modelo - localhost:3000/modelo/:modelo;
     versao - localhost:3000/versao/:versao;
     ano - localhost:3000/ano/:ano;
     local - localhost:3000/local/:local;
     km - localhost:3000/km/:km;
     valor - localhost:3000/valor/:valor;

   - Update: elaboramos apenas um PUT que modifica um elemento contido na tabela do banco
     de dados. Entretanto, deverá ser atualizado em breve, pois com esse código só é possível
     alterar se forem fornecidos todos os atributos dos carros e não somente o que será
     modificado. (é necessário a utilização do postman para fornecer os parâmetros que serão
     modificados)

   - Delete: apenas um DELETE, que exclui um carro de acordo com o respectivo id.
     (é necessário a utilização do postman para fornecer o id do carro que será excluido)

   OBS: O processo não foi linear. Durante o tempo disponível fomos desenvolvendo as rotas paralelamente
   ao banco de dados final. Todos desenvolveram pequenos bancos de dados para teste enquanto descobriamos
   como compartilhar o mesmo.
