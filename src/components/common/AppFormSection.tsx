"use client";

import AppFormField from "./AppFormField";

type FieldType = {
  name: string;
  placeholder: string;
  type?: string;
  icon?: any;
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
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-5 text-sm">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col justify-center">
            <AppFormField
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              icon={field.icon}
              register={register}
              error={errors?.[field.name]?.message}
            />
          </div>
        ))}
      </div>
    </div>
  );
}