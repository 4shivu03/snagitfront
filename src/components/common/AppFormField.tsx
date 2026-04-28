"use client";

import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
  icon?: any;
  maxlength?:number;
  minlength?:number;
};

export default function AppFormField({
  name,
  placeholder,
  register,
  error,
  type = "text",
  icon: Icon,
  maxlength:maxlength,
  minlength:minlength,
}: Props) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-2 text-gray-800" size={18} />
      )}
      <Input
        type={type}
        placeholder={placeholder}
        className="pl-10 placeholder:text-gray-800"
        {...(maxlength && { maxLength: maxlength })}
        {...(minlength && { minLength: minlength })}      
        {...register(name)}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
