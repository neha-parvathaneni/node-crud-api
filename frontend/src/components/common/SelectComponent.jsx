function SelectComponent({
  value,
  onChange,
  options,
  labelKey,
  valueKey
}) {
  return (
    <select
      value={value}
      onChange={onChange}
    >
      <option value="">
        Select
      </option>

      {options.map((item) => (
        <option
          key={item[valueKey]}
          value={item[valueKey]}
        >
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}

export default SelectComponent;