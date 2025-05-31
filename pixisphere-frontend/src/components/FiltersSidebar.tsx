import React from 'react';
import styles from './FiltersSidebar.module.css';

interface FiltersSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  rating: number;
  setRating: (rating: number) => void;
  styles: string[];
  setStyles: (styles: string[]) => void;
  city: string;
  setCity: (city: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  availableStyles: string[];
  availableCities: string[];
}

const ratingOptions = [4, 3, 2, 1];
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'recent', label: 'Recently Added' },
];

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  priceRange, setPriceRange, rating, setRating, styles: selectedStyles, setStyles, city, setCity, sort, setSort, availableStyles, availableCities
}) => {
  return (
    <aside className={styles.filtersSidebar}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="price-range">Price Range</label>
        <input
          id="price-range"
          type="range"
          min={0}
          max={30000}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className={styles.priceRange}
          title="Price Range"
        />
        <div className={styles.priceRangeValues}>
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="ratings">Ratings</label>
        <select id="ratings" value={rating} onChange={e => setRating(Number(e.target.value))} className={styles.selectInput} title="Ratings">
          <option value={0}>All</option>
          {ratingOptions.map(r => (
            <option key={r} value={r}>{r}+</option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Styles</label>
        <div className={styles.stylesWrap}>
          {availableStyles.map(style => (
            <label key={style} className={styles.styleCheckboxLabel}>
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => setStyles(selectedStyles.includes(style) ? selectedStyles.filter(s => s !== style) : [...selectedStyles, style])}
                className={styles.styleCheckbox}
              />
              <span className={styles.styleName}>{style}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="city">City</label>
        <select id="city" value={city} onChange={e => setCity(e.target.value)} className={styles.selectInput} title="City">
          <option value="">All</option>
          {availableCities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.filterLabel} htmlFor="sort">Sort By</label>
        <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className={styles.selectInput} title="Sort By">
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
