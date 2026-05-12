import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder, validationRegex, onInvalidInput }) => {
  const handleChange = (event) => {
    const nextValue = event.target.value;
    if (validationRegex && nextValue && !validationRegex.test(nextValue)) {
      if (onInvalidInput) {
        onInvalidInput();
      }
      return;
    }
    onChange(nextValue);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full px-4 py-2 text-slate-300">
      <Search size={16} />
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm w-full"
      />
    </div>
  );
};

export default SearchBar;
