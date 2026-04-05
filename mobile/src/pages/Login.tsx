import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple mock login
    if (email && password) {
      navigate("/dashboard/investor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy-light p-6 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-display font-bold text-navy text-center mb-6">Login</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Enter your password"
              />
            </div>

            <Button onClick={handleLogin} className="w-full bg-navy hover:bg-navy-dark">
              Login
            </Button>
          </div>

          <div className="text-center mt-4">
            <Link to="/register" className="text-navy hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;