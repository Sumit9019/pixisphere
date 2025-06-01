"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { usePhotographerStore } from '@/store/photographers';
import PhotographerCard from '@/components/PhotographerCard';
import FiltersSidebar from '@/components/FiltersSidebar';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

import { useRouter, useParams } from 'next/navigation';
import styles from "./category.module.css";


const css = styles as any;

const allStyles = ["Traditional", "Candid", "Studio", "Outdoor", "Indoor"];

const getParamString = (param: string | string[] | undefined) => {
  if (!param) return '';
  if (Array.isArray(param)) return param[0] || '';
  return param;
};

const CategoryListingPage = () => {
  const { filtered, photographers, fetchPhotographers, setFiltered, loading, error } = usePhotographerStore();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [rating, setRating] = useState(0);
  const [styles, setStyles] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('recent');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchPhotographers();
  }, [fetchPhotographers]);

  useEffect(() => {
    let result = [...photographers];
    if (city) {
      result = result.filter(p => p.location.toLowerCase() === city.toLowerCase());
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (rating) {
      result = result.filter(p => p.rating >= rating);
    }
    if (styles.length) {
      result = result.filter(p => styles.some(s => p.styles.includes(s)));
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.tags.some(t => t.toLowerCase().includes(s))
      );
    }
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'rating-desc') result.sort((a, b) => b.rating - a.rating);
    if (sort === 'recent') result.sort((a, b) => b.id - a.id);
    setFiltered(result);
  }, [photographers, priceRange, rating, styles, city, sort, search, setFiltered]);

  const availableCities = useMemo(() => Array.from(new Set(photographers.map(p => p.location))), [photographers]);

  const [visible, setVisible] = useState(6);
  const handleLoadMore = () => setVisible(v => v + 6);

  const handleViewProfile = (id: number) => {
    router.push(`/photographer/${id}`);
  };

  return (
    <div className={css.categoryPageWrapper}>
      <h1 className={css.categoryTitle}>
        {getParamString(params?.category) ? `All Photographers` : 'Photographers'}
      </h1>

      <SearchBar value={search} onChange={setSearch} />

      <div className={css.categoryMain}>
        <FiltersSidebar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          styles={styles}
          setStyles={setStyles}
          city={city}
          setCity={setCity}
          sort={sort}
          setSort={setSort}
          availableStyles={allStyles}
          availableCities={availableCities}
        />

        <div className={css.categoryContent}>
          {loading && (
            <div className={css.categoryGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={css.skeletonCard} />
              ))}
            </div>
          )}

          {error && (
            <div className={css.errorMsg}>
              {error}
            </div>
          )}

          {!loading && !filtered.length && (
            <div className={css.emptyState}>
              <Image src="/empty-state.svg" alt="No results" width={160} height={160} />
              <p className="text-lg font-medium">No photographers found.</p>
              <p className="text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}

          <div className={css.categoryGrid}>
            {filtered.slice(0, visible).map((photographer) => (
              <PhotographerCard
                key={photographer.id}
                photographer={photographer}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>

          {visible < filtered.length && (
            <div className={css.loadMoreWrapper}>
              <button
                onClick={handleLoadMore}
                className={css.loadMoreBtn}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListingPage;
