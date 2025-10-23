function Input({ value, label, type, onChange, error, required, placeholder }) {
  return (
    <div className={`input-label ${error ? "has-error" : ""}`}>
      {error && <span className="error-message">{error}</span>}

      <label>
        {label}
        {required && " *"}
      </label>

      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? "error" : ""}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
