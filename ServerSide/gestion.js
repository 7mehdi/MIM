const express = require('express');
const port = 7000;
const cors = require('cors');

const app = express();
const { createPool } = require('mysql');

const { check, validationResult } = require("express-validator");

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Slimane1921/',
    database: 'projet_stage',
  });
  
// Validation middleware for user creation
const createUserValidationRules = [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ];
  
  // Validation middleware for role modification
  const modifyRoleValidationRules = [
    check("role").notEmpty().withMessage("Role is required"),
  ];
  
  // Get all users
  app.get("/api1/users", (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
        return;
      }
      res.json(rows);
    });
  });
  
  // Create a new user
  app.post("/api1/users", createUserValidationRules, (req, res) => {
   console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {name, email, password, role } = req.body;
  
    pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?,?)", [name,email, password, role], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during user creation" });
        return;
      }
      res.json({ message: "User created successfully" });
    });
  });
  
  app.delete("/api1/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const newUserId = 4;
  
    pool.query("UPDATE confirmation SET user_id = ? WHERE user_id = ?", [newUserId, userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during confirmation table update" });
        return;
      }

      res.json({ message: "User deleted successfully" });
    });
    pool.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during user deletion" });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
 
    });
  });
  
  
  // Modify the role of a user
  app.put("/api1/users/:userId", modifyRoleValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const userId = req.params.userId;
    const { role } = req.body;
  
    pool.query("UPDATE users SET role = ? WHERE id = ?", [role, userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during role modification" });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      res.json({ message: "User role modified successfully" });
    });
  });
  
    // Get stock
    app.get("/api/stock", (req, res) => {
      pool.query("SELECT * FROM stock", (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
          return;
        }
        res.json(rows);
        console.log(rows)
      });
    });
    
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  