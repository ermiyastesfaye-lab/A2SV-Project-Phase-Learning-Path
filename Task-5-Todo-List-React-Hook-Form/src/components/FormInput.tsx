import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: ReturnType<UseFormRegister<any>>;
  error?: FieldError | undefined;
  textarea?: boolean;
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  textarea = false,
  rows = 5,
}) => (
  <div className={`form-group${error ? " error" : ""}`}>
    <label htmlFor={id}>{label}</label>
    {textarea ? (
      <textarea id={id} rows={rows} placeholder={placeholder} {...register} />
    ) : (
      <input id={id} type={type} placeholder={placeholder} {...register} />
    )}
    {error && typeof error.message === "string" && (
      <span className="error-message">
        <AiOutlineWarning size={16} />
        {error.message}
      </span>
    )}
  </div>
);

export default FormInput;
