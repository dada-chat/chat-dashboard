import clsx from "clsx";

interface FormInputProps {
  label?: string;
  type?: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  helper?: string;
}

export function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
  onBlur,
  error,
  helper,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        required={required}
        className={clsx(
          "relative block w-full h-12 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none",
          disabled && "bg-gray-200 !text-gray-500"
        )}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helper && <p className="text-xs text-gray-400">{helper}</p>}
    </div>
  );
}
