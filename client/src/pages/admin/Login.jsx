import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginAdmin from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(
        formData.username,
        formData.password
      );

      login(data.user, data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
            UZZI.DEV
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Admin Login
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-white/10 bg-white/3 p-6 rounded-2xl"
        >
          {error && (
            <div className="mb-5 border border-red-500/20 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30 transition"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30 transition"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-lg py-3 font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
