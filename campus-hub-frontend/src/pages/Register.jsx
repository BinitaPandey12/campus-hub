import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Simple password strength indicator
    let strength = 0;
    if (value.length > 0) strength += 20;
    if (value.length >= 8) strength += 30;
    if (/[A-Z]/.test(value)) strength += 20;
    if (/[0-9]/.test(value)) strength += 20;
    if (/[^A-Za-z0-9]/.test(value)) strength += 10;
    
    setPasswordStrength(Math.min(strength, 100));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "#ef4444"; // red
    if (passwordStrength < 70) return "#f59e0b"; // amber
    return "#10b981"; // emerald
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/user-dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h1 className="register-title">Create Account</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
        <div className="password-strength-bar" style={{ backgroundColor: getStrengthColor(), width: `${passwordStrength}%`, height: "5px", marginTop: "5px" }} />
        <button type="submit" className="register-button">
          Register
        </button>
        <button
          type="button"
          className="register-button google-signin"
          style={{ backgroundColor: "#4285F4", color: "white" }}
          onClick={async () => {
            setError("");
            try {
              const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
              const provider = new GoogleAuthProvider();
              await signInWithPopup(auth, provider);
              navigate("/user-dashboard");
            } catch (err) {
              setError(err.message || "Google sign-in failed. Please try again.");
            }
          }}
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
        <div className="register-footer">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </div>
      </form>
    </div>
  );
}
export default Register;