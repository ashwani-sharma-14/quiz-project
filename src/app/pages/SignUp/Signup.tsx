import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/signupSchema";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/utils/clientApiInstace";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProfileForm {
  name: string;
  password: string;
}

const Signup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const googleUser = location.state?.googleUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(SignupSchema.pick({ name: true, password: true })),
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const response = await api.post("/user/signup", {
        ...googleUser,
        password: data.password,
      });

      if (response.data.success) {
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
      >

        <div className="mb-4">
          <Label htmlFor="password">Create Password</Label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Create a strong password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full bg-blue-500 text-white">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
