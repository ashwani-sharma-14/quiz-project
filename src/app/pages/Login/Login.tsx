import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GoogleLogin from "./components/GoogleLogin";
import { LoginSchema } from "@/schemas/loginSchema";
import type { SignInData } from "@/schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";
import { useAuthStore } from "@/store/useAuthStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: SignInData) => {
    const credentials = {
      email: data.identifier,
      password: data.password,
    };
    const success = await login(credentials);
    if (!success) {
      toast.error("User not found. Please sign up using Google.");
      return;
    }

    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="font-sans bg-banner bg-gray-100 flex justify-center items-center h-screen w-full bg-fixed bg-center bg-cover p-4">
      <div className="bg-white rounded-[16px] shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-8 text-center hover:shadow-xl">
        <div className="mb-4 h-24 w-24 mx-auto rounded-full">
          <img
            src={logo}
            alt="logo"
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Login
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mb-6">
          to explore MITS T&P Practice Portal..!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <Label htmlFor="identifier">Email</Label>
            <Input
              type="email"
              id="identifier"
              {...register("identifier")}
              placeholder="Enter your email"
              className="w-full h-10 p-3 border border-gray-300 rounded-[8px]"
            />
            {errors.identifier && (
              <span className="text-red-500 text-sm">
                {errors.identifier.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full h-10 p-3 border border-gray-300 rounded-[8px]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-[8px] hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </Button>
        </form>

        <div className="text-gray-500 text-sm my-4">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
