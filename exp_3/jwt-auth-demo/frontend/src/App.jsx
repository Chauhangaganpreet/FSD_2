import { useState } from "react";
import "./App.css";
import { loginUser } from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setUsername("");
    setPassword("");
  };

  // Dashboard
  if (user) {
    return (
      <div className="dashboard">

        <header>
          <div>
            <h1>🛡️ CampusGuard</h1>
            <p>Smart University Security Portal</p>
          </div>

          <button onClick={logout}>
            Logout
          </button>
        </header>

        <main>

          <div className="welcome">
            <div>
              <span>SECURE SESSION</span>

              <h2>
                Welcome, {user.name} 👋
              </h2>

              <p>
                You are successfully authenticated
                using JWT.
              </p>
            </div>

            <div className="shield">
              🛡️
            </div>
          </div>

          <div className="cards">

            <div className="card">
              <div>👤</div>
              <h3>Username</h3>
              <p>{user.username}</p>
            </div>

            <div className="card">
              <div>🔐</div>
              <h3>Authentication</h3>
              <p className="green">
                JWT Active
              </p>
            </div>

            <div className="card">
              <div>🛡️</div>
              <h3>Role</h3>
              <p>{user.role}</p>
            </div>

            <div className="card">
              <div>⚡</div>
              <h3>Access</h3>
              <p>Protected</p>
            </div>

          </div>

          <div className="panel">

            <h2>
              🔐 Role Based Access Control
            </h2>

            <p>
              Your dashboard changes according
              to your role.
            </p>

            {user.role === "Admin" && (
              <div className="permission admin">
                <h3>👑 Admin Access</h3>

                <p>
                  You have full system access.
                </p>

                <button>Manage Users</button>
                <button>Security Logs</button>
                <button>System Settings</button>
              </div>
            )}

            {user.role === "Editor" && (
              <div className="permission editor">
                <h3>✏️ Faculty Access</h3>

                <p>
                  You can manage academic content.
                </p>

                <button>
                  Create Announcement
                </button>

                <button>
                  Manage Assignments
                </button>
              </div>
            )}

            {user.role === "Viewer" && (
              <div className="permission viewer">
                <h3>👨‍🎓 Student Access</h3>

                <p>
                  You can view university resources.
                </p>

                <button>
                  View Announcements
                </button>

                <button>
                  View Timetable
                </button>

                <button>
                  View Assignments
                </button>
              </div>
            )}

          </div>

          <div className="security">

            <h2>🛡️ Security Center</h2>

            <div className="security-row">

              <div>
                <strong>Authentication</strong>
                <span>✓ Active</span>
              </div>

              <div>
                <strong>JWT Token</strong>
                <span>✓ Valid</span>
              </div>

              <div>
                <strong>Authorization</strong>
                <span>✓ RBAC Enabled</span>
              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // Login
  return (
    <div className="login-page">

      <div className="login-info">

        <div className="logo">
          🛡️
        </div>

        <h1>CampusGuard</h1>

        <h2>
          Smart & Secure University Portal
        </h2>

        <p>
          A secure authentication system
          powered by JWT and Role-Based
          Access Control.
        </p>

        <div className="features">

          <div>🔐 JWT Authentication</div>
          <div>🛡️ Role-Based Access Control</div>
          <div>⚡ Protected Resources</div>

        </div>

      </div>

      <div className="login-area">

        <div className="login-box">

          <div className="lock">
            🔐
          </div>

          <h2>Welcome Back</h2>

          <p>
            Login to your campus account
          </p>

          <form onSubmit={handleLogin}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="login-btn"
            >
              Login →
            </button>

          </form>

          {error && (
            <div className="error">
              ❌ {error}
            </div>
          )}

          <div className="demo">

            <h3>Demo Accounts</h3>

            <p>
              👑 Admin:
              <br />
              admin / admin123
            </p>

            <p>
              ✏️ Faculty:
              <br />
              faculty / faculty123
            </p>

            <p>
              👨‍🎓 Student:
              <br />
              student / student123
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;