import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
};

export function TextInput({
  id,
  label,
  error,
  className = "",
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[15px] font-semibold leading-[22px] text-[var(--color-text-primary)]"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`min-h-11 w-full rounded-[var(--radius-md)] border-[1.5px] bg-white px-4 py-3.5 text-base leading-[26px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-4 focus-visible:ring-offset-white ${
          error
            ? "border-[var(--color-error)]"
            : "border-[var(--color-border-default)]"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={describedBy} className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextTextarea({
  id,
  label,
  error,
  className = "",
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[15px] font-semibold leading-[22px] text-[var(--color-text-primary)]"
      >
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`min-h-28 w-full resize-y rounded-[var(--radius-md)] border-[1.5px] bg-white px-4 py-3.5 text-base leading-[26px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-4 focus-visible:ring-offset-white ${
          error
            ? "border-[var(--color-error)]"
            : "border-[var(--color-border-default)]"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={describedBy} className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
