# Pyramids Pharmacy Task

## Project Overview

This project consists of a `frontend` and `backend`, both containerized using Docker. The backend connects to a database using credentials stored in the `.env` file. The project is orchestrated using Docker Compose.

---

## Prerequisites

Ensure you have the following installed before running the project locally:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Folder Structure


- `backend/`: Backend application code (Django. application used was api).
- `frontend/`: Frontend application code (React with Vite).
- `.env`: Environment variables (database credentials).
- `docker-compose.yml`: Docker Compose configuration.

---

## Steps to Run Locally with Docker

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Pyramids-Pharmacy-Task
```

### 2. Configure the Environment File

Create a `.env` file in the root directory (if not already present) and add the following:

```env
DB_HOST=db
DB_PORT=5432
POSTGRES_DB=pharmacy
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```
### 3. Build and start the containers

Create a `.env` file in the root directory (if not already present) and add the following:

```
docker-compose up --build
```

### 4. Run Migrations in the Backend Container

After starting the containers, you need to apply the database migrations for the backend.

1. **Access the Backend Container**:
   Run the following command to open a terminal inside the backend container:
   ```bash
   docker exec -it <backend-container-name> sh
   ```
2. **Run the migrations**:
Run the following command in the terminal
```
python manage.py makemigrations
python manage.py migrate
```
### 5. Access the application: 
Frontend: http://localhost:3000.  
Backend: http://localhost:8000.  

### 6. Documentation:  
A postman collection JSON file is included as well to view the api routes

