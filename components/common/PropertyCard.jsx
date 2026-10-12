"use client";

import Image from "next/image";
import { AmenityIcon } from "@/components/search/AmenityIcon";

const getRatingLabel = (rating) => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4) return "Very Good";
  if (rating >= 3.5) return "Good";
  return "Fair";
};

export function PropertyCard({
  title,
  location,
  price,
  rating,
  image,
  deal,
  reviewCount = 52,
  propertyType,
  roomType,
  size,
  distance,
  amenities = [],
  features = [],
  isFavorite = false,
  onToggleFavorite,
  oldPrice,
  priceLabel,
  availability,
  tags = [],
  onClick,
  className,
  showSearchLayout = Boolean(deal || propertyType || distance || amenities.length),
}) {
  if (showSearchLayout) {
    const numericRating = Number.parseFloat(rating) || 0;
    const numericPrice = Number(String(price).replace(/[^\d.]/g, ""));
    const numericOldPrice = Number(String(oldPrice).replace(/[^\d.]/g, ""));
    const discount =
      numericOldPrice > numericPrice && numericPrice > 0
        ? Math.round(((numericOldPrice - numericPrice) / numericOldPrice) * 100)
        : 0;
    const detailTags = tags.filter((tag) => !/cancellation/i.test(tag));
    const benefitPills = [
      ...tags.filter((tag) => /cancellation/i.test(tag)),
      ...features,
      ...amenities,
      ...detailTags,
    ].filter((value, index, values) => values.indexOf(value) === index).slice(0, 3);

    return (
      <article
        className={['search-property-card', className].filter(Boolean).join(' ')}
        onClick={onClick}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && onClick) {
            event.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="search-property-image-wrap">
          <Image
            src={image}
            alt={title}
            className="search-property-image"
            width={400}
            height={220}
            sizes="(max-width: 560px) calc(100vw - 60px), (max-width: 1024px) 30vw, 256px"
          />
          {deal && <span className="search-property-deal">{deal}</span>}
          <button
            type="button"
            className={`search-property-favorite ${isFavorite ? 'is-favorite' : ''}`}
            aria-label={isFavorite ? `Remove ${title} from saved list` : `Save ${title}`}
            aria-pressed={isFavorite}
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavorite?.();
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
          </button>
        </div>

        <div className="search-property-content">
          <div className="search-property-header-row">
            <div className="search-property-heading">
              <div className="search-property-title-row">
                <h3>{title}</h3>
                <span className="search-property-stars" role="img" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < Math.round(numericRating) ? "is-filled" : "is-empty"}>
                      ★
                    </span>
                  ))}
                </span>
              </div>
              <div className="search-property-location">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>{location}</span>
                {distance && <span className="search-property-location-detail">{distance}</span>}
                {detailTags.map((tag) => (
                  <span className="search-property-location-detail" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="search-property-rating-summary">
              <span className="search-property-rating-label">{getRatingLabel(numericRating)}</span>
              <span className="search-property-reviews">{Number(reviewCount).toLocaleString()} reviews</span>
              <strong>{numericRating.toFixed(1)}</strong>
            </div>
          </div>

          <div className="search-property-meta">
            {propertyType && <span>{propertyType}</span>}
            {roomType && <span>{roomType}</span>}
            {size && <span>{size}</span>}
          </div>

          <div className="search-property-bottom-row">
            <div className="search-property-benefits-wrap">
              <div className="search-property-features">
                {benefitPills.map((benefit) => (
                  <span className="search-property-benefit" key={benefit}>
                    {benefit.toLowerCase().includes("cancellation") ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    ) : (
                      <AmenityIcon amenity={benefit} />
                    )}
                    {benefit}
                  </span>
                ))}
              </div>
              {availability && (
                <span className={`search-property-availability${/left|limited/i.test(availability) ? " is-urgent" : ""}`}>
                  {availability}
                </span>
              )}
            </div>

            <div className="search-property-pricing">
              {discount > 0 && <span className="search-property-discount">{discount}% off</span>}
              <div className="search-property-price-row">
                {oldPrice && <span>{oldPrice}</span>}
                <strong>{price}</strong>
              </div>
              <small>{priceLabel ?? 'per night'}</small>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={['hostel-card', className].filter(Boolean).join(' ')}>
      <div className="card-image">
        <Image src={image} alt={title} width={400} height={260} />
        <button
          type="button"
          aria-label={`Save ${title}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.();
          }}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <span>★ {rating} ({reviewCount} reviews)</span>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>◉ &nbsp;{location}</p>
        <small>
          Dorm beds: <b>{price}</b>
        </small>
        <small>
          Private room: <b>$28 / night</b>
        </small>
        <button type="button">Book Now</button>
        <strong>★★★★★</strong>
      </div>
    </article>
  );
}
