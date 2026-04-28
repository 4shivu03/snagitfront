"use client";

type Props = {
  name: string;
  placeholder: string;
  register: any;
  error?: string;
  rows?: number;
  maxlength?: number;
  required?: boolean;
};

export default function AppTextareaField({
  name,
  placeholder,
  register,
  error,
  rows = 3,
  maxlength,
  required = false,
}: Props) {
  return (
    <div className="space-y-1">
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 bg-gray-700 text-white rounded placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        {...(maxlength !== undefined && { maxLength: maxlength })}
        {...register(name)}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}