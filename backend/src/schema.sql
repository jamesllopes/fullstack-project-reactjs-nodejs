CREATE DATABASE dindin;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
  descricao TEXT
);

DROP TABLE IF EXISTS transacoes;

CREATE TABLE transacoes (
	id SERIAL PRIMARY KEY,
  descricao TEXT,
  valor INTEGER NOT NULL,
  data TIMESTAMPTZ,
  categoria_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  tipo TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO categorias (descricao) VALUES ('Alimentação');
INSERT INTO categorias (descricao) VALUES ('Assinaturas e Serviços');
INSERT INTO categorias (descricao) VALUES ('Casa');
INSERT INTO categorias (descricao) VALUES ('Mercado');
INSERT INTO categorias (descricao) VALUES ('Cuidados Pessoais');
INSERT INTO categorias (descricao) VALUES ('Educação');
INSERT INTO categorias (descricao) VALUES ('Família');
INSERT INTO categorias (descricao) VALUES ('Lazer');
INSERT INTO categorias (descricao) VALUES ('Pets');
INSERT INTO categorias (descricao) VALUES ('Presentes');
INSERT INTO categorias (descricao) VALUES ('Roupas');
INSERT INTO categorias (descricao) VALUES ('Saúde');
INSERT INTO categorias (descricao) VALUES ('Transporte');
INSERT INTO categorias (descricao) VALUES ('Salário');
INSERT INTO categorias (descricao) VALUES ('Vendas');
INSERT INTO categorias (descricao) VALUES ('Outras receitas');
INSERT INTO categorias (descricao) VALUES ('Outras despesas');

