import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import csv from "csv-parser";

const router = express.Router();
const CSV_FILE = "./users.csv";

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // If file doesn’t exist yet, create it with headers
    if (!fs.existsSync(CSV_FILE)) {
      const header = "email,originalPassword,hashedPassword\n";
      const hashedPassword = await bcrypt.hash(password, 10);
      const newLine = `${header}${email},${password},${hashedPassword}\n`;
      fs.writeFileSync(CSV_FILE, newLine);
      return res.status(201).json({ message: "User registered successfully" });
    }

    // Otherwise, read all users
    const users = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on("data", (row) => users.push(row))
      .on("end", async () => {
        const userExists = users.some((u) => u.email === email);
        if (userExists) {
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newLine = `${email},${password},${hashedPassword}\n`;
        fs.appendFileSync(CSV_FILE, newLine);

        return res.status(201).json({ message: "User registered successfully" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving user" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!fs.existsSync(CSV_FILE)) {
      return res.status(404).json({ message: "No users found" });
    }

    const users = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on("data", (row) => users.push(row))
      .on("end", async () => {
        const user = users.find((u) => u.email === email);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // ✅ For compatibility with your CSV format:
        // 'originalPassword' (or 'phone') = plain password
        // 'hashedPassword' (or 'password') = bcrypt hash
        const plainPassword = user.originalPassword || user.phone;
        const hashedPassword = user.hashedPassword || user.password;

        const isMatch =
          plainPassword === password ||
          (await bcrypt.compare(password, hashedPassword));

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.json({ message: "Login successful" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
