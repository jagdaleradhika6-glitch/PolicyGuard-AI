# PolicyGuard AI

PolicyGuard AI is an AI-powered policy analysis platform that enables users to upload, manage, and analyze policy documents through a secure full-stack web application. The platform provides authentication, document management, AI-assisted policy insights, and administrative controls.

## Features

- User Registration and Login
- JWT-Based Authentication
- Policy Document Upload
- AI-Powered Policy Analysis
- User Dashboard
- Admin Dashboard
- MySQL Database Integration
- REST APIs
- Responsive User Interface

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA

### Database
- MySQL

## Project Structure

policylens-ai/
├── frontend/
├── backend/
├── uploads/
└── README.md

## Installation

### Clone Repository

git clone <repository-url>

cd policylens-ai

### Create Database

CREATE DATABASE policyguard_ai;

### Configure Database

Update database credentials in:

backend/src/main/resources/application.properties

### Run Backend

cd backend

mvn spring-boot:run

Backend URL:
http://localhost:8080

### Run Frontend

cd frontend

npm install

npm run dev

Frontend URL:
http://localhost:5173

## API Documentation

Swagger UI:
http://localhost:8080/swagger-ui.html

## Main Modules

- Authentication Module
- Document Upload Module
- Policy Analysis Module
- User Management
- Admin Management
- AI Integration

## Future Enhancements

- Cloud Deployment
- Advanced AI Models
- Email Notifications
- Analytics Dashboard
- Role-Based Access Control

## Author

Radhika Jagdale

Software Developer | Java Full Stack Developer
