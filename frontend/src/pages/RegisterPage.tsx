import { useRegister } from "@/hooks/auth-hooks";
import { useState } from "react";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
      });
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const registerMutation = useRegister();
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(null); 
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (formData.password !== formData.password_confirm) {
          setErrorMessage("Passwords do not match.");
          return;
        }
    
        const { ...dataToSubmit } = formData;
    
        registerMutation.mutate(dataToSubmit);
      };
    
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 className="text-6xl font-bold text-gray-800 text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password_confirm"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {registerMutation.isPending ? "Registering..." : "Register"}
              </button>
              {registerMutation.isError && (
                <p className="text-sm text-red-600 mt-2">
                  Error: {registerMutation.error?.message || "Registration failed"}
                </p>
              )}
              {registerMutation.isSuccess && (
                <p className="text-sm text-green-600 mt-2">Registration successful!</p>
              )}
            </form>
          </div>
        </div>
      );
};

export default RegisterPage;
