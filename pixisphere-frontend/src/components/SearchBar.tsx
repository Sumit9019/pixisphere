import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [input, setInput] = useState(value);

  // Debounce input
  React.useEffect(() => {
    const handler = setTimeout(() => {
      onChange(input);
    }, 400);
    return () => clearTimeout(handler);
  }, [input, onChange]);

  return (
    <div className={styles.searchBarWrapper}>
      <input
        type="text"
        placeholder="Search by name, location, or tag..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className={styles.searchInput}
        aria-label="Search photographers"
      />
      <span className={styles.searchIcon}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </span>
    </div>
  );
};

export default SearchBar;
