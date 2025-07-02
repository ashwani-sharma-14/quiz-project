import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GoogleLogin from "./components/GoogleLogin";
import { LoginSchema } from "@/schemas/loginSchema";
import type { SignInData } from "@/schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";

interface LoginData {
  email: string;
  password: string;
}

interface UseAuthStore {
  login: (data: LoginData) => Promise<boolean>;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => (state as UseAuthStore).login);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: SignInData) => {
    setLoading(true);
    const credentials = {
      email: data.identifier,
      password: data.password,
    };
    const success = await login(credentials);
    setLoading(false);
    if (success) navigate("/");
  };

  return (
    <div className="font-sans bg-[url('@/assets/mits.png')] bg-no-repeat bg-fixed bg-center bg-cover h-screen w-full p-4 flex justify-center items-center">
      <div className="bg-white/80 rounded-2xl shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-8 text-center hover:shadow-xl">
        <div className="mb-4 h-24 w-30 mx-auto rounded-full">
          <img src={logo} alt="logo" className="object-cover h-full w-full" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-600 text-sm mb-6">
          to explore MITS T&P Practice Portal..!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="text-left space-y-1">
            <Label htmlFor="identifier" className="text-base font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="identifier"
              autoComplete="off"
              {...register("identifier")}
              placeholder="Enter your email"
              className="w-full h-10 p-3 border border-gray-300 rounded-lg"
              style={{ borderRadius: "10px" }}
              aria-invalid={!!errors.identifier}
            />
            {errors.identifier && (
              <span className="text-red-500 text-sm">
                {errors.identifier.message}
              </span>
            )}
          </div>

          <div className="text-left space-y-1 relative">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full h-10 p-3 border border-gray-300 rounded-lg pr-10"
              style={{ borderRadius: "10px" }}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 rounded-2xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-gray-500 text-sm my-4">or</div>

        <div className="flex flex-col items-center gap-2">
          <GoogleLogin />
          <p className="text-xs text-gray-600">
            First time users please sign up using your college ID.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
