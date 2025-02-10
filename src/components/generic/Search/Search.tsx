import { useState, ChangeEvent } from "react";
import SearchIcon from "../../../assets/search.svg";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center bg-white border-1 border-gray-100 px-2 rounded w-full">
      <img src={SearchIcon} alt="search-icon.svg" className="size-4 mr-2" />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className="flex-1 border-none outline-none bg-transparent p-1"
      />
    </div>
  );
};

export default Search;
