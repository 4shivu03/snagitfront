"use client";

import { Input } from "@/components/ui/input";

type FieldType = {
  name: string;
  placeholder: string;
  type?: string;
};

type Props = {
  title: string;
  fields: FieldType[];
  register: any;
  errors?: any;
};

export default function AppFormSection({
  title,
  fields,
  register,
  errors,
}: Props) {
  return (
    <div>
      <h3 className="mb-2 text-sm text-gray-300 font-semibold">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <Input
              type={field.type || "text"}
              placeholder={field.placeholder}
              {...register(field.name)}
            />
            {errors?.[field.name] && (
              <p className="text-red-400 text-sm mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
