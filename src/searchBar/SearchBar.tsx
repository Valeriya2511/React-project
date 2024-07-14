import { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  lastSearchQuery: string;
}

const SearchForm = ({ lastSearchQuery, onSearch }: SearchFormProps) => {
  const [count, setCount] = useState<string>('');

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearchQuery');

    if (savedQuery) {
      setCount(savedQuery);
    } else if (lastSearchQuery) {
      setCount(lastSearchQuery);
    }
  }, [lastSearchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(count.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={count}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
