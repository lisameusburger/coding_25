interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (city: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  placeholder = "Search for a city..."
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          aria-label="City search"
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="search-button" 
          aria-label="Search"
          disabled={!searchQuery.trim()}
        >
          <svg
            className="search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

