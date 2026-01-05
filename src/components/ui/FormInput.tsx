import clsx from "clsx";

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 lg:text-base">
        {label}
      </label>
      <input
        type={type}
        required={required}
        className={clsx(
          "relative block w-full h-12 rounded-md border border-gray-300 px-3 py-2text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none lg:text-base",
          disabled && "bg-gray-200"
        )}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
