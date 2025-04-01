-- Ativa o suporte a foreign keys
PRAGMA foreign_keys = ON;

-- Remove as tabelas existentes (CUIDADO: isso apagará os dados atuais)
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS users;

-- Cria a tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT NOT NULL,
    cpf_cnpj TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    observacoes TEXT
);

-- Cria a tabela de eventos com FK para clientes e ON DELETE CASCADE
CREATE TABLE IF NOT EXISTS evento (
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
    FOREIGN KEY (cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Cria a tabela de usuários (sem campo role)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Insere um usuário padrão (exemplo: admin)
INSERT INTO users (username, password)
VALUES ('admin', '123456');
