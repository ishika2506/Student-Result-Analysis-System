# Online Student Result Analysis System (OSRAS)

> **7th Semester Capstone Project**  
> An automated platform for university marksheet ingestion, SGPA/CGPA analytics, student performance tracking, and NBA/NAAC accreditation compliance reporting.

---

## 📌 Project Overview
The **Online Student Result Analysis System (OSRAS)** addresses the difficulties faced by academic departments in processing raw university result rosters. It replaces manual spreadsheet calculations with automated parsing, provides real-time analytical dashboards for institutional decision-making, and delivers early warnings for students requiring remedial support.

### Key Capabilities
- **Multi-Format Ingestion:** Ingest raw university result sheets in Excel (`.xlsx`, `.xls`), CSV, and structured PDF formats.
- **Academic Calculation Engine:** Automated computation of SGPA, CGPA, credit accumulation, backlog tracking, and grace mark handling.
- **Multi-Level Analytics:**
  - **Institutional / HOD:** Department pass/fail distributions, course difficulty indices, and faculty performance ratings.
  - **Class Advisor / Faculty:** Class rankings, topper identification, and automated flagging of **at-risk / slow learners**.
  - **Student Self-Service:** Longitudinal graphical progress tracking, semester scorecards, and backlog status.
- **Accreditation Ready:** One-click export of **NAAC Criteria 2.6** and **NBA Course Outcome Attainment** tables into PDF and Excel formats.
- **Role-Based Access Control (RBAC):** Distinct roles for Admin, HOD, Faculty, and Student.

---

## 📂 Project Architecture & Directory Structure

```text
online-result-analysis-system/
├── docs/                                 # Academic Documentation & Specifications
│   └── BUSINESS_REQUIREMENTS_DOCUMENT.md # Detailed BRD for 7th Sem submission
├── backend/                              # Backend Application API (FastAPI / Node.js)
│   ├── app/
│   │   ├── api/v1/                       # Modular REST API endpoints
│   │   ├── core/                         # Auth, JWT, Security, and Config
│   │   ├── db/                           # Database connection & Alembic migrations
│   │   ├── models/                       # SQLAlchemy / Prisma ORM entities
│   │   ├── schemas/                      # Pydantic data validation contracts
│   │   ├── services/                     # Business logic (Parser, SGPA Calc, Analytics)
│   │   └── utils/                        # Shared utilities & grading formulas
│   └── tests/                            # Unit & Integration test suites
├── frontend/                             # Frontend Web Portal (React / Next.js)
│   └── src/
│       ├── components/                   # UI components (Recharts, tables, uploaders)
│       ├── pages/                        # Role-specific dashboards (Admin, HOD, Faculty, Student)
│       ├── services/                     # Axios API clients
│       └── context/                      # Auth and Global State
└── sample_data/                          # Test marksheets and rosters for project viva
```

---

## 📑 Documentation
The complete, detailed **Business Requirements Document (BRD)** is available at:
👉 [docs/BUSINESS_REQUIREMENTS_DOCUMENT.md](docs/BUSINESS_REQUIREMENTS_DOCUMENT.md)

---

## 🚀 Recommended Tech Stack
- **Frontend:** React.js / Next.js, Tailwind CSS, Lucide Icons, Recharts
- **Backend:** Python (FastAPI with Pandas & OpenPyXL) or Node.js (Express/NestJS)
- **Database:** PostgreSQL (Relational schema with ACID compliance)
- **Authentication:** JWT (JSON Web Tokens) with Bcrypt hashing
- **Containerization:** Docker & Docker Compose
