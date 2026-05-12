import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import { ROUTES } from "../routes/routePaths.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[A-Za-z]).{6,}$/;

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = form.email.trim();
    const password = form.password;
    if (!emailRegex.test(email)) {
      addToast({
        title: "Invalid email",
        message: "Use a valid email address.",
        tone: "error"
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      addToast({
        title: "Invalid password",
        message: "Password must be at least 6 characters.",
        tone: "error"
      });
      return;
    }
    setSubmitting(true);
    try {
      const user = await login({ email, password });
      const destination =
        user.role === "LIBRARIAN" ? ROUTES.librarian.dashboard : ROUTES.member.dashboard;
      addToast({ title: "Welcome back", message: `${user.name} signed in`, tone: "success" });
      navigate(destination);
    } catch (error) {
      addToast({
        title: "Login failed",
        message: error.message || "Check your credentials",
        tone: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display text-white">Sign in</h2>
        <p className="text-sm text-slate-400">Use a librarian or member account.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white"
            placeholder="librarian@lib.com"
            pattern={emailRegex.source}
            title="Enter a valid email address"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white"
            placeholder="********"
            pattern={passwordRegex.source}
            title="At least 6 characters"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="text-xs text-slate-400 space-y-1">
        <p>Mock librarian: librarian@lib.com</p>
        <p>Mock member: member@lib.com</p>
      </div>
    </div>
  );
};

export default Login;
