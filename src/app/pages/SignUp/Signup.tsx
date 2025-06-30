import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/signupSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { branches } from "@/constants/branched";
import logo from "@/assets/logo.jpg";

interface ProfileForm {
  name: string;
  email: string;
  password: string;
  enrollment: string;
  profile: string;
  branch: string;
  admissionYear: number;
  currentYear: number;
}

interface GoogleUser {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface UseAuthStore {
  signup: (data: ProfileForm) => Promise<boolean>;
  googleUser: GoogleUser;
  isSigningup: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const signup = useAuthStore(
    (state: unknown) => (state as UseAuthStore).signup
  );
  const googleUser = useAuthStore(
    (state: unknown) => (state as UseAuthStore).googleUser
  );
  const isSigningup = useAuthStore(
    (state: unknown) => (state as UseAuthStore).isSigningup
  );

  const createPairs = (str: string) => str?.match(/.{1,2}/g);
  let newBranch = "";
  let newYear = "";

  const extractBranch = (str: string) => {
    const pairs = createPairs(str);
    if (str.startsWith("09") && pairs && pairs.length > 2) {
      newBranch = pairs[2];
      newYear = "20" + pairs[3];
    } else if (str.startsWith("BT") && pairs && pairs.length > 2) {
      newBranch = pairs[1];
      newYear = "20" + pairs[2];
    }
  };

  extractBranch(googleUser?.given_name || "");
  const branch = branches[newBranch as keyof typeof branches];
  const admissionYear = parseInt(newYear);
  const getCurrentYear = (admissionYear: number) => {
    const now = new Date();
    let year = now.getFullYear() - admissionYear;
    if (now.getMonth() + 1 >= 6) year += 1;
    return Math.min(Math.max(year, 1), 4);
  };

  const currentYear = getCurrentYear(admissionYear);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: googleUser?.family_name,
      email: googleUser?.email,
      profile: googleUser?.picture,
      enrollment: googleUser?.given_name,
      branch,
      admissionYear,
      currentYear,
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const response = await signup(data);
      if (response) {
        navigate("/");
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Signup failed. Try again.");
    }
  };

  useEffect(() => {
    if (!isSigningup) {
      navigate("/login");
    }
  }, [isSigningup, navigate]);

  if (!isSigningup) return null;

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
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
          Complete Signup
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mb-6">
          Just set your password and get started!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <Label htmlFor="password">Create Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Create a strong password"
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
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
