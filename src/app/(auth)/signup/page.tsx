"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validation/signupSchema";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signupUser } from "@/lib/apicall/authApi";
import { useRouter } from "next/navigation";
import AppFormField from "@/components/common/AppFormField";
import { useLoading } from "@/context/LoadingContext";

type FormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await signupUser(data);
      setLoading(false);
      toast.success("Account created");
      router.push("/login");
    } catch {
      setLoading(false);
      toast.error("Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-white backdrop-blur-xl p-6">
        <CardContent>
          <h2 className="text-gray-800 font-bold text-xl font-bold text-center mb-4">
            Create Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <AppFormField
              name="firstName"
              placeholder="First Name"
              register={register}
              error={errors.firstName?.message}
              icon={User}              
            />
            <AppFormField
              name="lastName"
              placeholder="Last Name"
              register={register}
              error={errors.lastName?.message}
              icon={User}
            />
            <AppFormField
              name="email"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
              icon={Mail}
            />
            <AppFormField
              name="mobile"
              placeholder="Mobile"
              register={register}
              error={errors.mobile?.message}
              icon={Phone}
              maxlength={10}
              minlength={10}
            />
            <AppFormField
              name="password"
              placeholder="Password"
              type="password"
              register={register}
              error={errors.password?.message}
              icon={Lock}
              minlength={6}
            />
            <div className="flex justify-center">
              <Button
                className="flex items-center gap-2 bg-gray-600 text-white border border-gray-800 hover:bg-white hover:text-gray-800 px-10 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <UserPlus size={18} />
                {isSubmitting ? "Loading..." : "Signup"}
              </Button>
            </div>
          </form>
          <p className="text-gray-800 text-center mt-4">
            Already have account?{" "}
            <Link
              href="/login"
              className="text-gray-800 font-bold cursor-pointer hover:underline"
            >
              Login here!
            </Link>
          </p>
          <p className="text-gray-800 text-center mt-4">
            Are you a seller?{" "}
            <Link
              href="/sellerregistration"
              className="text-gray-800 font-bold cursor-pointer hover:underline"
            >
              Signup here!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
