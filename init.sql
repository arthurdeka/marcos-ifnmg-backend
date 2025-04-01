-- Ativar suporte a Foreign Keys no SQLite
PRAGMA foreign_keys = ON;


-- Cria tabela de clientes
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT NOT NULL,
    cpf_cnpj TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    observacoes TEXT
);

-- Cria tabela de eventos
CREATE TABLE evento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_evento TEXT NOT NULL,
    cliente INTEGER NOT NULL,
    meio_agendamento TEXT,
    local_evento TEXT,
    data_evento TEXT,
    tipo_evento TEXT,
    atendente_responsavel TEXT,
    observacoes TEXT,
    horas_duracao INTEGER,
    -- Define a FK (cliente -> clientes.id)
    FOREIGN KEY (cliente) REFERENCES clientes (id)
);

-- Cria tabela de usuários do sistema
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Insere um usuário exemplo
INSERT INTO users (username, role, password)
VALUES ('professor', 'admin', '123456');
