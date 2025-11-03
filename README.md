# 🏆 Desafio-milliontec

Aplicação full‑stack para cadastro de clientes  
Frontend: React + TypeScript + Material UI  
Backend: Node.js + TypeORM + PostgreSQL

> Este README foca no fluxo de desenvolvimento usando Docker.

## Funcionalidades
- Frontend: React + TypeScript + Material UI  
- Backend: Node.js + TypeORM + PostgreSQL  
- Autenticação simples (usuário: `admin` / senha: `admin`) com JWT  
- CRUD de clientes (criar, listar e editar)  
- Exportação da lista de clientes em PDF  
- Ambiente dockerizado com hot‑reload para frontend e backend  
- Adminer para inspeção do banco de dados

## Portas padrão
- Frontend: http://localhost:5173  
- Backend: http://localhost:3001  
- PostgreSQL: 5432  
- Adminer: http://localhost:8080

## Início
1. Certifique‑se que o Docker Desktop está instalado e em execução.  
2. No diretório raiz do projeto execute:
```bash
docker-compose up --build -d
# ou, se já buildado:
docker-compose up
```

3. Verifique os logs:
```bash
docker-compose logs -f backend
docker-compose logs -f db
```

4. Acesse:
- Frontend: http://localhost:5173  
- Adminer: http://localhost:8080  

Conecte usando usuário e senha do .env do backend / docker-compose.yml.

Para parar:
```bash
docker-compose down
```

Para remover volumes do banco (apaga dados):
```bash
docker-compose down -v
```

## Arquivos de ambiente

Backend (backend/.env)
```
JWT_SECRET=12345678
DB_HOST=db
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=desafio_milliontec
```

Quando usar Docker, o DB_HOST deve ser db (nome do serviço)

Não envie este arquivo para o Git

Frontend (frontend/.env ou .env.local)
```
VITE_API_URL=http://localhost:3001
```

## Autenticação e segurança

Usuário padrão: admin  
Senha padrão: admin

Backend emite JWT e, se configurado, um cookie HttpOnly para autenticação

Em produção, use HTTPS e um JWT_SECRET forte

Em desenvolvimento, o DevTools do navegador mostrará o payload de login — isso é normal

## Endpoints HTTP (exemplos)
- `POST /auth/login` — login (body: { username, password })  
- `POST /auth/logout` — logout (limpa cookie)  
- `GET /clients` — lista clientes (protegido)  
- `POST /clients` — cria cliente (protegido)  
- `PUT /clients/:id` — atualiza cliente (protegido)  

## Problemas comuns com Docker
- Conflito de porta (ex: 3001 já em uso): pare o processo local ou altere o mapeamento no docker-compose.yml

- Falha na inicialização do banco:
```bash
docker-compose down -v
docker-compose up --build -d
```

- Erro Missing JWT_SECRET: verifique se backend/.env existe e se env_file está configurado no docker-compose.yml

## Estrutura do projeto
- `frontend/` — app React + Vite

- `backend/` — API Node + TypeORM

- `docker-compose.yml` — Compose dev (Postgres + Adminer + frontend + backend)