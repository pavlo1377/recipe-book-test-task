

# Recipe Book Application

This repository contains a full-stack Recipe Book application with a **frontend** built using React and Vite, and a **backend** built using Express and TypeScript.

---

## 📂 Project Structure

- `frontend/` — React + TS + Vite frontend application
- `backend/` — Express + TypeScript backend API



## 🚀 Running the Application

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

---

### 1. Setup Environment Variables


#### Backend `.env` (`backend/.env`)

```env
PORT=5000
```

---

#### Frontend `.env` (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

### 2. Install Dependencies

From the root, install dependencies for both parts:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

### 3. Run Development Servers


* **Frontend:**

```bash
cd frontend
npm run dev
```

* **Backend:**

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`.
The frontend will run on `http://localhost:5173`.




## 🧹 Linting

You can run ESLint on the frontend code with:

```bash
npm run lint
```


