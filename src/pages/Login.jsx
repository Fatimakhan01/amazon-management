import { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);

      console.log("Login data:", formData);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome back
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Sign in to access your warehouse dashboard.
        </p>
      </div>

      {errors.general && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 shrink-0" size={17} />
          <span>{errors.general}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          error={errors.password}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 rounded border-gray-300 text-[#FF9900] accent-[#FF9900] focus:ring-[#FF9900]"
            />

            <span className="text-sm text-gray-600">
              Remember me
            </span>
          </label>

          <button
            type="button"
            disabled={isLoading}
            className="text-sm font-medium text-[#E47911] transition hover:text-[#C45F00] disabled:opacity-50"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#E47911] transition hover:text-[#C45F00]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;