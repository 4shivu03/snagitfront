"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, KeyRound, Send, LockOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppFormField from "@/components/common/AppFormField";
import { sendOtp, resetPassword } from "@/lib/apicall/authApi";
import { useLoading } from "@/context/LoadingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "@/lib/validation/forgotSchema";
import { resetSchema } from "@/lib/validation/resetSchema";

export default function ForgotPasswordPage() {
  const { setLoading } = useLoading();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(step === 1 ? forgotSchema : resetSchema),
    mode: "onChange",
  });
  const handleSendOtp = async (data: any) => {
    try {
      setLoading(true);
      await sendOtp(data.email);
      setEmail(data.email);
      toast.success("OTP sent");
      setStep(2);
      reset(); 
    } catch (err: any) {
      toast.error(err?.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = async (data: any) => {
    try {
      setLoading(true);
      await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.password,
      });
      toast.success("Password reset successful");
      setStep(1);
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">      
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-xl font-bold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-white text-center text-sm mb-4">
          {step === 1
            ? "Enter your email to receive OTP"
            : `OTP sent to ${email}`}
        </p>
        {step === 1 && (
          <form
            onSubmit={handleSubmit(handleSendOtp)}
            className="space-y-4"
            autoComplete="off"
          >
            <AppFormField
              name="email"
              placeholder="Enter Email"
              register={register}
              error={errors.email?.message?.toString()}
              icon={Mail}
            />
            <div className="flex justify-center">
              <Button className="flex items-center gap-2 bg-gray-600 text-white border border-gray-800 hover:bg-white hover:text-gray-800 px-10 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                <Send size={18} />
                Send OTP
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(handleReset)}
            className="space-y-4"
            autoComplete="off"
          >
            <AppFormField
              name="otp"
              placeholder="Enter OTP"
              register={register}
              error={errors.otp?.message?.toString()}
              icon={KeyRound}
              maxlength={6}
            />
            <AppFormField
              name="password"
              placeholder="New Password"
              type="password"
              register={register}
              error={errors.password?.message?.toString()}
              icon={LockOpen}
            />
            <div className="flex justify-center">
              <Button className="flex items-center gap-2 bg-gray-600 text-white border border-gray-800 hover:bg-white hover:text-gray-800 px-10 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                <LockOpen size={18} />
                Reset Password
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}