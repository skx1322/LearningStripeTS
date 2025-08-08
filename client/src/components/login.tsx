import * as React from "react";
import type { AccountLogin } from "../types/types";
import { FaLock, FaUser } from "react-icons/fa";

interface LoginProps {
  setCurrentPage: (page: "Register" | "Login") => void;
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const [loginData, setLoginData] = React.useState<AccountLogin>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt with:", loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-support-gray-dark p-8 md:p-12 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-text-main text-sm font-medium mb-2"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
                <FaUser />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border border-support-gray-light focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-text-main text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border border-support-gray-light focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-gold text-primary font-semibold py-3 rounded-lg shadow-lg hover:bg-accent-maroon transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-text-secondary text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentPage("Register")}
            className="text-accent-gold hover:underline cursor-pointer"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
