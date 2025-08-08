import * as React from "react";
import type { AccountRegister } from "../types/types";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface RegisterProps {
  setCurrentPage: (page: "Register" | "Login") => void;
}

const Register: React.FC<RegisterProps> = ({setCurrentPage}) => {
  const [registerData, setRegisterData] = React.useState<AccountRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatchError, setPasswordMatchError] =
    React.useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    console.log("Registration attempt with:", registerData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-support-gray-dark p-8 md:p-12 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
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
                value={registerData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border border-support-gray-light focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-text-main text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border border-support-gray-light focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your email"
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
                value={registerData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border border-support-gray-light focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-text-main text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
                <FaLock />
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg bg-primary text-text-main border focus:outline-none focus:ring-2 focus:ring-accent-gold ${
                  passwordMatchError
                    ? "border-red-500"
                    : "border-support-gray-light"
                }`}
                placeholder="Confirm your password"
                required
              />
            </div>
            {passwordMatchError && (
              <p className="mt-2 text-sm text-red-500">
                Passwords do not match.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-accent-gold text-primary font-semibold py-3 rounded-lg shadow-lg hover:bg-accent-maroon transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-text-secondary text-sm">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("Login")}
            className="text-accent-gold hover:underline cursor-pointer"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
