import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full px-4 py-2 text-slate-300">
      <Search size={16} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm w-full"
      />
    </div>
  );
};

export default SearchBar;
