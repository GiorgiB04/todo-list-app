import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import sequelize from "./utils/database.js";
import cors from "cors";

// Initialize environment variables
config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());

// In-memory storage for tasks (replace with a database in production)
let tasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
];

// Routes
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks); // Return an array of tasks
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title }; // Generate a new task
  tasks.push(newTask); // Add the task to the array
  res.json({ message: "Task added successfully", task: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // Only accept the `title` field
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex].title = title; // Update only the `title` field
  res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter((task) => task.id !== Number(id)); // Remove the task
  res.json({ message: "Task deleted successfully", id });
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ success: false, message: message, data: data });
});

// DB Connection (if using a database)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
