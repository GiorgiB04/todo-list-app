# 📝 Todo List App

A full-featured Todo List application built with **React**, **Redux Toolkit (RTK Query)**, **MySQL**, and **Docker**.  
This project demonstrates a complete CRUD flow, backend API integration, and responsive UI — ideal for task management in a modern development stack.

---

## 🚀 Features

- ✅ Add, edit, and delete tasks
- ✅ Persistent storage with MySQL database
- ✅ API calls managed with RTK Query
- ✅ Responsive and clean UI using Tailwind CSS
- ✅ Edit tasks in a modal popup
- ✅ Dockerized backend and database environment

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Redux Toolkit & RTK Query
- Tailwind CSS
- ShadCN UI Components

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- MySQL 8.0

**DevOps:**
- Docker & Docker Compose

---

## 📁 Project Structure

todo-list-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── db.json (or config.js)
├── frontend/
│ ├── components/
│ ├── features/
│ ├── pages/
│ └── App.jsx
└── docker-compose.yml

yaml
Copy
Edit

---

## ⚙️ Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/GiorgiB04/todo-list-app.git
cd todo-list-app
```

### 2. Start the full stack environment with Docker
```
docker-compose up --build
The frontend will be available at: http://localhost:3000
Backend API will run on: http://localhost:5000/api/messages
```

🧑‍💻 Author
Giorgi Boch
[LinkedIn](https://www.linkedin.com/in/gio-botchorishvili/) • [GitHub](https://github.com/GiorgiB04/)

📃 License
This project is licensed under the MIT License.
