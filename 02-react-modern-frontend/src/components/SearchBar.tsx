import { useState } from 'react';

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
  const [validationError, setValidationError] = useState('');
  const [showShake, setShowShake] = useState(false);

  const validateInput = (input: string): string => {
    const trimmed = input.trim();
    
    if (!trimmed) {
      return 'Please enter a city name';
    }
    
    if (trimmed.length < 2) {
      return 'City name is too short';
    }
    
    if (trimmed.length > 85) {
      return 'City name is too long';
    }
    
    // Check for invalid characters (allow letters, spaces, hyphens, apostrophes)
    const validPattern = /^[a-zA-Z\s\-'àâäãåèéêëìíîïòóôöõùúûüñçčšžÀÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕÙÚÛÜÑßÇČŠŽ]+$/;
    if (!validPattern.test(trimmed)) {
      return 'City name contains invalid characters';
    }
    
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateInput(searchQuery);
    
    if (error) {
      setValidationError(error);
      setShowShake(true);
      setTimeout(() => setShowShake(false), 500);
      return;
    }
    
    setValidationError('');
    onSearchSubmit(searchQuery.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const hasError = !!validationError;
  const isEmpty = !searchQuery.trim();

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className={`search-container ${hasError ? 'has-error' : ''} ${showShake ? 'shake' : ''}`}>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          aria-label="City search"
          aria-invalid={hasError}
          aria-describedby={hasError ? "search-error" : undefined}
          autoComplete="off"
          maxLength={85}
        />
        <button 
          type="submit" 
          className="search-button" 
          aria-label="Search"
          disabled={isEmpty}
          title={isEmpty ? "Please enter a city name" : "Search"}
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
      {validationError && (
        <div id="search-error" className="search-error" role="alert">
          <span className="error-icon-small">⚠️</span>
          {validationError}
        </div>
      )}
    </form>
  );
};

export default SearchBar;

