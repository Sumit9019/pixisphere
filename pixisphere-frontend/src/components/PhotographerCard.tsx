import React from 'react';
import { Photographer } from '@/store/photographers';
import styles from './PhotographerCard.module.css';

interface PhotographerCardProps {
  photographer: Photographer;
  onViewProfile: (id: number) => void;
}

const getPlaceholderImage = (id: number) => {
  const placeholders = [
    '/images/placeholder1.svg',
    '/images/placeholder2.svg',
    '/images/placeholder3.svg',
  ];
  return placeholders[(id - 1) % placeholders.length];
};

const PhotographerCard: React.FC<PhotographerCardProps> = ({ photographer, onViewProfile }) => (
  <div className={styles.photographerCard}>
    <div className={styles.profilePicWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photographer.profilePic || getPlaceholderImage(photographer.id)}
        onError={e => {
          (e.currentTarget as HTMLImageElement).src = getPlaceholderImage(photographer.id);
        }}
        alt={photographer.name}
        className={styles.profilePic}
        loading="lazy"
      />
      <span className={styles.ratingBadge}>{photographer.rating}★</span>
    </div>
    <h2 className={styles.photographerName}>{photographer.name}</h2>
    <div className={styles.photographerLocation}>{photographer.location}</div>
    <div className={styles.photographerPrice}>₹{photographer.price.toLocaleString()}</div>
    <div className={styles.photographerTags}>
      {photographer.tags.map((tag) => (
        <span key={tag} className={styles.photographerTag}>{tag}</span>
      ))}
    </div>
    <button
      className={styles.viewProfileBtn}
      onClick={() => onViewProfile(photographer.id)}
      tabIndex={0}
    >
      View Profile
    </button>
  </div>
);

export default PhotographerCard;
