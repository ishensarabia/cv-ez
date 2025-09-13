function TextCanvas({ value, label, onChange }) {
  return (
    <div className="text-canvas">
      {label}
      <textarea value={value ? value : ""} onChange={onChange} />
    </div>
  );
}
export default TextCanvas;