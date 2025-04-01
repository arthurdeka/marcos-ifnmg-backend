-- Remove as tabelas existentes
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS users;

-- Cria a tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    cpf_cnpj TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    observacoes TEXT
);

-- Cria a tabela de eventos com FK para clientes e ON DELETE CASCADE
CREATE TABLE evento (
    id SERIAL PRIMARY KEY,
    nome_evento TEXT NOT NULL,
    cliente INTEGER NOT NULL,
    meio_agendamento TEXT,
    local_evento TEXT,
    data_evento TEXT,
    tipo_evento TEXT,
    atendente_responsavel TEXT,
    observacoes TEXT,
    horas_duracao INTEGER,
    CONSTRAINT fk_cliente FOREIGN KEY (cliente)
      REFERENCES clientes(id) ON DELETE CASCADE
);

-- Cria a tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Insere um usuário padrão
INSERT INTO users (username, password)
VALUES ('admin', '123456');
