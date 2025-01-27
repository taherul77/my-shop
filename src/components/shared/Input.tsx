/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: any;
  required?: boolean;
  defaultValue?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  register,
  error,
  required = false,
  defaultValue
}) => {
  return (
    <div className="flex flex-col gap-2 col-span-1">
      <label className="text-gray-800 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`mt-1 block w-full pl-3 pr-10 bg-slate-200 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${error ? "border-red-500" : "border-gray-300"
          }`}
        defaultValue={defaultValue}
      />
      {error && (
        <p className="text-sm text-red-500">
          {error.message || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default Input;