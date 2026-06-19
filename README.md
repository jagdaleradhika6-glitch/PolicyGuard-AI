PolicyGuard AI
AI-powered platform to analyze insurance policies, T&Cs, privacy policies, and legal agreements. Upload PDFs/DOCX → get summaries, key clauses, risk highlights, and Q&A in plain language.

Tech Stack
Frontend: React 18 + Vite + Tailwind CSS + React Router + Axios
Backend: Java 17 + Spring Boot 3 (Web, Security, Data JPA, Validation)
Database: MySQL 8
Auth: JWT (access tokens, BCrypt password hashing)
AI: OpenAI / Groq API (pluggable)
File Parsing: Apache PDFBox (PDF), Apache POI (DOCX)
Project Structure
policyguard-ai/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/policyguard/
│   │   ├── config/           # Security, CORS, AI client beans
│   │   ├── controller/       # REST controllers
│   │   ├── dto/              # Request/response DTOs
│   │   ├── entity/           # JPA entities
│   │   ├── exception/        # Global exception handler
│   │   ├── repository/       # Spring Data JPA repositories
│   │   ├── security/         # JWT filter, utils, UserDetails
│   │   └── service/          # Business logic + AI + file parsing
│   ├── src/main/resources/application.properties
│   └── pom.xml
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # Navbar, Footer, Hero, FeatureCard, etc.
│   │   ├── pages/            # Home, Login, Register, Dashboard, Upload, Detail, Admin, Profile
│   │   ├── context/          # AuthContext
│   │   ├── services/         # api.js (axios)
│   │   └── App.jsx, main.jsx, index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── database/schema.sql       # MySQL schema
└── README.md
Database Schema (MySQL)
Tables: users, documents, policy_analysis, questions, reports, admin_logs. See database/schema.sql.

REST API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register user	Public
POST	/api/auth/login	Login → JWT	Public
GET	/api/users/me	Current profile	USER/ADMIN
PUT	/api/users/me	Update profile	USER/ADMIN
POST	/api/documents/upload	Upload PDF/DOCX	USER
GET	/api/documents	List my documents (search/filter)	USER
GET	/api/documents/{id}	Document + analysis	USER
DELETE	/api/documents/{id}	Delete	USER
GET	/api/documents/{id}/report	Download PDF report	USER
POST	/api/documents/{id}/ask	Ask question about document	USER
GET	/api/admin/users	List all users	ADMIN
GET	/api/admin/documents	All documents	ADMIN
Setup
1. Database
CREATE DATABASE policyguard;
mysql -u root -p policyguard < database/schema.sql
2. Backend
cd backend
# edit src/main/resources/application.properties (DB creds, JWT_SECRET, OPENAI_API_KEY)
./mvnw spring-boot:run    # http://localhost:8080
3. Frontend
cd frontend
npm install
npm run dev               # http://localhost:5173
Environment Variables (backend)
DB_URL, DB_USER, DB_PASS
JWT_SECRET (32+ chars)
OPENAI_API_KEY or GROQ_API_KEY
AI_PROVIDER=openai|groq
Deployment
Backend: ./mvnw clean package → deploy target/*.jar to Render/Railway/AWS EC2.
Frontend: npm run build → deploy dist/ to Vercel/Netlify.
DB: MySQL on PlanetScale/AWS RDS.
Features
JWT auth + role-based access (USER, ADMIN)
PDF/DOCX upload & parsing
AI summary, key clauses, risk detection
Conversational Q&A per document
Search & filter document history
Downloadable analysis report
Admin dashboard
Responsive UI, glassmorphism, smooth animations
