export function Field({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  required = false,
  error = "",
}) {
  return (
    <label className="plp-field">
      <span>
        {label}
        {required && <b>*</b>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error)}
      />
      {error && <small className="plp-field-error">{error}</small>}
    </label>
  );
}
