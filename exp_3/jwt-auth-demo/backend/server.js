const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || "campusguard_secret_key";

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    createDemoUsers();
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(error.message);
  });

/* ================= USER MODEL ================= */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Editor", "Viewer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

/* ================= DEMO USERS ================= */

async function createDemoUsers() {
  try {
    const users = [
      {
        name: "Admin User",
        username: "admin",
        password: "admin123",
        role: "Admin",
      },

      {
        name: "Faculty User",
        username: "faculty",
        password: "faculty123",
        role: "Editor",
      },

      {
        name: "Student User",
        username: "student",
        password: "student123",
        role: "Viewer",
      },
    ];

    for (const user of users) {
      const existingUser = await User.findOne({
        username: user.username,
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(
          user.password,
          10
        );

        await User.create({
          name: user.name,
          username: user.username,
          password: hashedPassword,
          role: user.role,
        });

        console.log(
          `✅ Created user: ${user.username}`
        );
      }
    }
  } catch (error) {
    console.log(
      "❌ Demo user creation error:",
      error.message
    );
  }
}

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.json({
    message: "CampusGuard Backend is running",
    status: "OK",
  });
});

/* ================= LOGIN ================= */

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log(
      `🔐 Login successful: ${user.username}`
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/* ================= JWT MIDDLEWARE ================= */

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

/* ================= PROTECTED ROUTE ================= */

app.get(
  "/api/protected",
  verifyToken,
  (req, res) => {
    res.json({
      message: "Protected resource accessed successfully",

      user: req.user,
    });
  }
);

/* ================= ADMIN ROUTE ================= */

app.get(
  "/api/admin",
  verifyToken,
  (req, res) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    res.json({
      message: "Welcome Admin",
      data: "Sensitive admin information",
    });
  }
);

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(
    `🚀 CampusGuard Backend running on http://localhost:${PORT}`
  );
});