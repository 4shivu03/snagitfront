"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/apicall/authApi";
import { Lock, LogIn, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import AppFormField from "@/components/common/AppFormField";
import { useLoading } from "@/context/LoadingContext";
import { loginSchema } from "@/lib/validation/loginSchema";

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      const user = res.user;
      setLoading(false);
      toast.success("Login success");
      if (user.role === "A") {
        router.push("/admin");
      } else if (user.role === "S") {
        router.push("/Seller");
      } else {
        router.push("/");
      }
    } catch {
      setLoading(false);
      toast.error("Login failed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-white backdrop-blur-xl p-6">
        <CardContent>
          <h2 className="text-gray-800 font-bold text-xl text-center mb-4">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <AppFormField
              name="email"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
              icon={Mail}
            />
            <AppFormField
              name="password"
              placeholder="Password"
              type="password"
              register={register}
              error={errors.password?.message}
              icon={Lock}
            />
            <div className="flex justify-center">
              <Button
                className="flex items-center gap-2 bg-gray-600 text-white border border-gray-800 hover:bg-white hover:text-gray-800 px-10 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <LogIn size={18} />
                {isSubmitting ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
          <p className="text-gray-800 text-center mt-4">
            Forgot password?{" "}
            <Link
              href="/forgotpassword"
              className="text-gray-800 font-bold cursor-pointer hover:underline"
            >
              Reset here!
            </Link>
          </p>
          <p className="text-gray-800 text-center mt-4">
            Don’t have account?{" "}
            <Link
              href="/signup"
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
