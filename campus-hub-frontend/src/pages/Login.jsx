import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user-dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/user-dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙊" : "🙈"}
          </span>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <button
          type="button"
          className="login-button google-signin"
          onClick={handleGoogleSignIn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          >
            <g>
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.2 3.23l6.9-6.9C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.8 2.69 14.09l8.06 6.26C12.7 14.19 17.91 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.41c-.54 2.9-2.18 5.36-4.65 7.02l7.19 5.6C43.98 37.07 46.1 31.32 46.1 24.55z"/>
              <path fill="#FBBC05" d="M10.75 28.35a14.5 14.5 0 0 1 0-8.7l-8.06-6.26A24.02 24.02 0 0 0 0 24c0 3.91.94 7.62 2.69 10.91l8.06-6.26z"/>
              <path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.54-5.53l-7.19-5.6c-2.01 1.35-4.59 2.13-8.35 2.13-6.09 0-11.3-4.69-13.25-10.97l-8.06 6.26C6.73 42.2 14.82 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </g>
          </svg>
          Sign in with Google
        </button>
        
        <div className="login-footer">
          Don't have an account? <Link to="/register" className="login-link">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;