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

  const createPairs = (str: string) => {
    if (!str) return;
    return str.match(/.{1,2}/g);
  };

  let newBranch = "";
  let newYear = "";

  const extractBranch = (str: string) => {
    if (!str) return;
    const pairs = createPairs(str);
    if (str.startsWith("09") && pairs && pairs.length > 2) {
      newBranch = pairs[2];
      newYear = "20" + pairs[3];
      return;
    } else if (str.startsWith("BT") && pairs && pairs.length > 2) {
      newBranch = pairs[1];
      newYear = "20" + pairs[2];
      return;
    }
  };

  extractBranch(googleUser.given_name);

  const branch = branches[newBranch as keyof typeof branches];
  const admissionYear = parseInt(newYear);

  const getCurrentYear = (admissionYear: number) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let year = currentYear - admissionYear;

    if (currentMonth >= 6) {
      year += 1;
    }
    if (year < 1) year = 1;
    if (year > 4) year = 4;

    return year;
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
      branch: branch,
      admissionYear: admissionYear,
      currentYear: currentYear,
    },
  });

  console.log(errors);

  const onSubmit = async (data: ProfileForm) => {
    console.log(data);
    try {
      const response = await signup(data);
      console.log(response);
      console.log(data);
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
  if (!isSigningup) {
    return null;
  } else {
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
  }
};

export default Signup;
