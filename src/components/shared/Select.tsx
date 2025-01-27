import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options: { value: string; label: string }[];
  error?: any;
}

const Select: React.FC<SelectProps> = ({ label, name, register, options, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Select;