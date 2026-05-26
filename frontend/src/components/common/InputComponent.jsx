function InputComponent({
  placeholder,
  value,
  onChange,
  type = "text"
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputComponent;