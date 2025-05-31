"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Photographer } from "@/store/photographers";
import "../../globals.css";

const getPlaceholderImage = (id: number) => {
  const placeholders = [
    "/images/placeholder1.svg",
    "/images/placeholder2.svg",
    "/images/placeholder3.svg",
  ];
  return placeholders[(id - 1) % placeholders.length];
};

const PhotographerProfilePage = () => {
  const params = useParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      setLoading(true);
      setError(null);
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const res = await fetch(`http://localhost:3001/photographers/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPhotographer(data);
      } catch {
        setError("Photographer not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotographer();
  }, [params.id]);

  if (loading)
    return (
      <div className="statusMessage">
        Loading profile...
      </div>
    );
  if (error || !photographer)
    return (
      <div className="statusMessage error">
        {error}
      </div>
    );

  return (
    <div className="pageWrapper">
      <div className="profileCard">
        <div className="profileLeft">
          <img
            src={photographer.profilePic || getPlaceholderImage(photographer.id)}
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = getPlaceholderImage(
                photographer.id
              ))
            }
            alt={photographer.name}
            loading="lazy"
            className="profilePic"
          />
          <div className="rating">
            <span className="text-yellow-500">★</span>
            <span>{photographer.rating}</span>
          </div>
        </div>

        <div className="profileRight">
          <h1>{photographer.name}</h1>
          <div className="location">{photographer.location}</div>
          <p className="bio">{photographer.bio}</p>

          <div className="badges">
            {photographer.styles.map((style) => (
              <span key={style} className="styleBadge">
                {style}
              </span>
            ))}
            {photographer.tags.map((tag) => (
              <span key={tag} className="tagBadge">
                {tag}
              </span>
            ))}
          </div>

          <div className="price">Starting at ₹{photographer.price.toLocaleString()}</div>
          <button
            onClick={() => setShowInquiry(true)}
            className="inquiryBtn"
          >
            Send Inquiry
          </button>
        </div>
      </div>

      <div className="gallerySection">
        <h2>Gallery</h2>
        <div className="galleryGrid">
          {photographer.portfolio.map((img, i) => (
            <img
              key={i}
              src={img.replace(".jpg", ".svg")}
              alt="Portfolio"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = getPlaceholderImage(
                  i + 1
                ))
              }
              loading="lazy"
              className="galleryImage"
            />
          ))}
        </div>
      </div>

      <div className="reviewSection">
        <h2>Reviews</h2>
        <div className="reviewList">
          {photographer.reviews.map((review, i) => (
            <div key={i} className="reviewCard">
              <div className="reviewHeader">
                <span>{review.name}</span>
                <span className="text-yellow-500">★</span>
                <span>{review.rating}</span>
                <span className="reviewDate">{review.date}</span>
              </div>
              <div className="reviewComment">{review.comment}</div>
            </div>
          ))}
        </div>
      </div>

      {showInquiry && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <button
              onClick={() => setShowInquiry(false)}
              className="modalClose"
            >
              ✕
            </button>
            <h3>Send Inquiry</h3>
            <form className="inquiryForm">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerProfilePage;
