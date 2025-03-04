# Jio SIM Management Portal

## 📌 Project Overview

The **Jio SIM Management Portal** is a comprehensive web application designed to manage SIM card orders, allocations, and user profiles efficiently. It provides a seamless experience for customers to order new SIMs, track orders, and manage their profiles, while administrators can handle user and SIM allocations.

## ✨ Features

- **User Authentication & Role-Based Access** (Admin & User)
- **SIM Ordering & Allocation System**
- **Track SIM Order Status**
- **Digital KYC Integration (PAN & Aadhaar Verification)**
- **OTP-Based Login via Firebase**
- **Admin Dashboard for User & SIM Management**
- **Payment Gateway Integration with Razorpay**
- **Secure JWT Authentication & Spring Security 6**

## 🛠 Tech Stack

### **Frontend (React.js with Vite & Bootstrap)**

- React.js with Vite
- React Router
- Redux Toolkit (State Management)
- Bootstrap for UI

### **Backend (Spring Boot)**

- Spring Boot 6 with Spring Security 6
- Java 17+
- JWT Authentication
- MongoDB (NoSQL Database)
- Firebase for OTP Verification
- Razorpay for Payments

## ⚙️ Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/himanshupr27/Jio-Sim-Managment-Portal.git
cd Jio-Sim-Managment-Portal
```

### **2. Backend Setup (Spring Boot)**

- Install dependencies:

```sh
cd backend
mvn clean install
```

- Run the Spring Boot server:

```sh
mvn spring-boot:run
```

### **3. Frontend Setup (React.js)**

- Install dependencies:

```sh
cd frontend
npm install
```

- Start the development server:

```sh
npm run dev
```

## 🔑 Authentication & Security

- **User Login:** Secure login using JWT authentication.
- **Admin Panel:** Only admins can access user & SIM management features.
- **OTP Verification:** Firebase-based OTP login for user authentication.
- **Role-Based Access Control:** Restrict actions based on user roles.

## 💾 API Endpoints (Spring Boot)

### **User Authentication**

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| `POST` | `/api/auth/login`      | User login with JWT       |
| `POST` | `/api/auth/register`   | User registration         |
| `POST` | `/api/auth/verify-otp` | Firebase OTP verification |

### **SIM Management**

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| `POST` | `/api/sim/order`       | Order a new SIM        |
| `GET`  | `/api/sim/status/{id}` | Check SIM order status |
| `PUT`  | `/api/sim/assign/{id}` | Assign a SIM to a user |

## 🤝 Contributing

1. **Fork** the repository.
2. **Create a feature branch:** (`git checkout -b feature-branch`)
3. **Commit changes:** (`git commit -m 'Add new feature'`)
4. **Push to the branch:** (`git push origin feature-branch`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **MIT License**.

---

💡 **Need help?** Feel free to open an issue or reach out!

