# 💸 BCG-Price-Optimization-Tool

A web application built to help businesses determine optimal pricing strategies based on demand forecasts and market conditions.

---

## 📌 About the Project

This project was developed as part of a hiring assessment for a global enterprise aiming to optimize its pricing strategy. The application allows business users to manage products, forecast demand, and receive pricing optimization recommendations through an intuitive and responsive interface.

---

## 🎯 Features

### 🔐 User Authentication & Authorization

- User registration and login with email verification
- Role-based access (Admin, Buyer, Supplier, and custom roles)
- Dynamic permission assignment based on roles
- JWT-based authentication
- Token management and dependency injection included

### 📦 Product Management

- Create, Read, Update, and Delete (CRUD) products
- Product attributes include:
  - Name, Category, Cost Price, Selling Price, Description, Stock Available, Units Sold
- Advanced search and filter functionality by name and category

### 📈 Demand Forecast Integration

- Visualize product demand trajectory on a linear plot (Demand vs. Selling Price)
- Charting implemented using Chart.js

### 💹 Pricing Optimization

- Display optimized prices for products in a tabular view
- Integrated analysis based on demand forecasting and market data

### Infrastructure & Security Features
- Database table creation and migration
- Bulk CSV data loading
- Password hashing for user security
- Email verification during registration
- Application-wide logging
---

## 🛠️ Tech Stack

### Backend

- **FastAPI** (Python) for building a high-performance backend
- **MySQL** as the primary relational database

### Frontend

- **React.js** for a modern and responsive UI
- **Chart.js** for interactive data visualizations
- **Ant Design (antd)** for a rich set of pre-built UI components and consistent design system
- **Redux & Redux Toolkit** for efficient and scalable state management
---

## 🧠 Key Learnings

- **Asynchronous Backend Development**  
  Learned to build scalable and efficient APIs using FastAPI with SQLAlchemy's asynchronous ORM.

- **Secure User Management**  
  Implemented password hashing and email verification to follow modern authentication and security best practices.

- **Efficient State Management**  
  Used Redux Toolkit in the React frontend to manage global state with minimal boilerplate and high scalability.

- **Component-Based UI with Ant Design**  
  Built a responsive and user-friendly interface using Ant Design (AntD) components for consistent styling and layout.

- **Database Optimization**  
  Added indexing to key columns and used CSV-based data loading to improve query performance and streamline setup.

- **Clean Project Architecture**  
  Structured the project with clear separation of concerns across models, routes, services, and config files.

- **Robust Logging and Error Handling**  
  Integrated application-wide logging and error handling to aid in debugging and maintain observability.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NirmalPuttamoni/BCG-Price-Optimization-Tool.git
cd BCG-Price-Optimization-Tool
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate # or source venv/bin/activate on Unix
pip install -r requirements.txt
CREATE DATABASE bcg_db # in mysql cli or workbench | add mysqldb details in app.config.py
python -m app.init_db  # to create users and products tables
python -m app.etl.load_products # to load products data into product table
uvicorn main:app --reload
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

The API will be available at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

- Register as user(role)

## 📬 Contact

For questions, open an issue or contact me at `puttamoninirmal01@gmail.com`.
