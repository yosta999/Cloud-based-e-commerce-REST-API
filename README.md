# Cloud-based E-commerce REST API with Neural Network Threat Detection

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Brain.js](https://img.shields.io/badge/Brain.js-F3DF49?style=for-the-badge)

A production-ready, secure E-commerce REST API built with **Node.js, Express, and MongoDB**. The standout feature of this project is a custom **Neural Network** built with `brain.js` that actively monitors server logs to detect suspicious traffic patterns and potential cyber threats.

---

##  Key Features

### 1.  Core E-Commerce API
- **User Authentication:** Secure registration and login using `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for secure, stateless sessions.
- **Product Management:** CRUD operations for managing products (Create, Read, Update, Delete). Protected routes ensure only authorized users can modify inventory.
- **Order Processing:** Users can place orders linked to their accounts and view their order history.

### 2.  Neural Network Threat Detection (Grade 5 Feature)
- **Custom Logging Middleware:** Intercepts every incoming request, logging the IP address, accessed endpoint, HTTP status code, and response time directly to MongoDB.
- **Feature Extraction:** Processes raw server logs into normalized metrics (0.0 to 1.0) focusing on:
  - `failedLogins`: High rate of HTTP 401s.
  - `unknownRoutes`: High rate of HTTP 404s (indicative of directory traversal/scanning).
  - `requestRate`: High volume of requests over a short time span.
- **Brain.js AI Model:** A trained Neural Network evaluates the extracted features and outputs an AI verdict (`"normal"` or `"suspicious"`) along with a confidence score.

### 3.  Enterprise-Grade Security
- **Helmet.js:** Secures Express apps by setting various HTTP headers.
- **Rate Limiting:** Prevents Brute-Force and DDoS attacks by limiting IPs to 100 requests per 15 minutes. Intercepted requests return: `{"error": "You are in queue, try again later"}`.
- **CORS:** Cross-Origin Resource Sharing enabled.
- **Global Error Handling:** Centralized middleware to prevent application crashes from unhandled exceptions.

---

##  Project Architecture

```text
/
├── src/
│   ├── controllers/      # Route logic and business rules
│   ├── middleware/       # JWT auth, logging, rate limiting, error handling
│   ├── models/           # Mongoose schemas (User, Product, Order, Log)
│   ├── nn/               # Brain.js neural network configuration and training
│   ├── routes/           # Express route definitions
│   └── services/         # Logic for extracting features from logs for the AI
├── tests/                # Jest & Supertest API unit tests
├── .env                  # Environment variables (ignored in Git)
├── app.js                # Express app configuration
└── server.js             # Database connection and server initialization
```

---

##  How to Run the Project

### Prerequisites
- Node.js (v18+)
- MongoDB Community Server (running locally on port 27017)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd ecommerce-threat-detection
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the following variables:
   ```env
   PORT=3000
   DB_URI=mongodb://127.0.0.1:27017/ecommerce-nn
   JWT_SECRET=super_secret_jwt_key_123
   ```

### Starting the Server
```bash
npm start
```
*You should see `Connected to Local MongoDB successfully!` in your console.*

### Running the Unit Tests
```bash
npm test
```

---

##  Testing the API via Postman

### 1. Authentication
- **Register:** `POST /api/auth/register`
  ```json
  { "username": "demo_user", "password": "securepassword123" }
  ```
- **Login:** `POST /api/auth/login` (Returns your JWT token)

### 2. Products
- **Create Product (Protected):** `POST /api/products` *(Requires Bearer Token in Headers)*
  ```json
  { "name": "Laptop", "price": 1200, "description": "Gaming Laptop" }
  ```
- **Get Products (Public):** `GET /api/products`

### 3. Threat Detection 
To trigger the AI threat detection:
1. Intentionally send 10+ failed login attempts (wrong password) to generate `401 Unauthorized` logs.
2. Send rapid requests to random fake endpoints (e.g., `/api/admin/hack`) to generate `404 Not Found` logs.
3. Finally, trigger the report:
   - **GET** `http://localhost:3000/api/threat/report`

**Expected AI Response:**
```json
{
  "verdict": "suspicious",
  "score": 0.9854,
  "features": {
    "failedLogins": 0.75,
    "requestRate": 0.82,
    "unknownRoutes": 0.60
  }
}
```
