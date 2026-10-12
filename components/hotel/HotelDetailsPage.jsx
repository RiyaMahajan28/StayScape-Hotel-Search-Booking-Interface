"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AmenityIcon } from "@/components/search/AmenityIcon";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./hotel-details.css";

const hotelTabs = [
  ["Overview", "overview"],
  ["Amenities", "amenities"],
  ["Location", "location"],
  ["Calendar", "rooms"],
  ["Reviews", "reviews"],
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "heart") return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>;
  if (name === "share") return <svg {...common}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.5-4.4m-7.5 6.8 7.5 4.4" /></svg>;
  if (name === "pin") return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === "calendar") return <svg {...common}><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M8 3v4m8-4v4M4 10h16" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
  return null;
}

function HotelGallery({ hotel }) {
  const renderGalleryImage = (image, index) => (
    <div className={`hotel-gallery-image hotel-gallery-image-${index + 1}`} key={image}>
      <Image
        src={image}
        alt={`${hotel.name} ${index === 0 ? "interior" : `photo ${index + 1}`}`}
        fill
        priority={index === 0}
        sizes={index === 0 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 50vw, 25vw"}
      />
      {index === 0 && (
        <div className="hotel-host-pill">
          <Image src={hotel.host.avatar} alt="" width={48} height={48} />
          <span>{hotel.host.label}</span>
          {hotel.host.verified && <span className="hotel-host-verified" aria-label="Verified host">✓</span>}
        </div>
      )}
      {index === 4 && (
        <span className="hotel-gallery-count">
          <span aria-hidden="true">▦</span> {hotel.gallery.length + 5}+
        </span>
      )}
    </div>
  );

  return (
    <div className="hotel-gallery" aria-label={`${hotel.name} photo gallery`}>
      {renderGalleryImage(hotel.gallery[0], 0)}
      <div className="hotel-gallery-thumbnails">
        {hotel.gallery.slice(1, 5).map((image, index) => renderGalleryImage(image, index + 1))}
      </div>
    </div>
  );
}

function BookingCard({ hotel, onSelectRoom }) {
  return (
    <aside className="hotel-booking-card" aria-label="Room booking">
      <div>
        <strong>From {new Intl.NumberFormat("en-US", { style: "currency", currency: hotel.currency, maximumFractionDigits: 0 }).format(hotel.startingPrice)}</strong>
        <span> / night</span>
      </div>
      <button type="button" onClick={onSelectRoom}>Select room</button>
    </aside>
  );
}

function RoomCard({ room, quantity, onAdd, onRemove }) {
  const selected = quantity > 0;

  return (
    <article className={`hotel-room-card${selected ? " is-selected" : ""}`}>
      <div className="hotel-room-image">
        <Image src={room.image} alt={room.name} fill sizes="(max-width: 700px) 100vw, 180px" />
      </div>
      <div className="hotel-room-body">
        <div className="hotel-room-topline">
          <div>
            <h3>{room.name} <span>({room.detail})</span></h3>
            <p className="hotel-room-description">Bed in the {room.name.toLowerCase()} with a private bathroom and a shared attached washroom.</p>
          </div>
          <div className="hotel-room-rating"><span>Excellent</span><b>{(4.7 - (room.offset % 4) / 10).toFixed(1)}</b></div>
        </div>
        <div className="hotel-room-meta"><span>Luxury Hotel</span><i /> <span>Sea View Room</span><i /> <span>{room.beds}</span><i /> <span>{room.size}</span></div>
        <div className="hotel-room-perks">
          {room.perks.slice(0, 3).map((perk) => (
            <span key={perk}><span aria-hidden="true">✓</span>{perk}</span>
          ))}
        </div>
        <div className="hotel-room-bottom">
          <span className="hotel-room-availability">{room.available}</span>
          <div className="hotel-room-price">
            <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(room.price)}</strong>
            <small> / night</small>
          </div>
          {selected ? (
            <div className="hotel-room-quantity" aria-label={`${quantity} ${room.name} rooms selected`}>
              <button
                type="button"
                aria-label={`Remove one ${room.name}`}
                onClick={onRemove}
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label={`Add one ${room.name}`}
                onClick={onAdd}
              >
                +
              </button>
            </div>
          ) : (
            <button type="button" onClick={onAdd}>Select bed</button>
          )}
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="hotel-review-card">
      <div className="hotel-review-heading">
        <Image src={review.avatar} alt="" width={42} height={42} />
        <div><strong>{review.name}</strong><span>{review.date}</span></div>
        <span className="hotel-review-stars" aria-label={`${review.rating} out of 5 stars`}>★★★★★</span>
      </div>
      <p>{review.text}</p>
    </article>
  );
}

function LocationMap({ location }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="hotel-map" role="group" aria-label={`Map showing ${location}`}>
      <svg className="hotel-map-art" viewBox="0 0 730 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ transform: `scale(${zoom})` }}>
        <rect width="730" height="420" fill="var(--map-ground)" />
        <path d="M520 0h210v420H440c56-61 86-113 67-179-18-63 12-128 13-241Z" fill="var(--map-water)" />
        <g fill="none" stroke="var(--map-road)" strokeWidth="7">
          <path d="M-40 69 530 345M14 430 596-16M-26 293 456 29M127-20l300 455M-10 189l548 145M236-12 83 434" />
        </g>
        <g fill="none" stroke="var(--map-road-minor)" strokeWidth="3">
          <path d="m-10 33 560 295M6 116 491 359M25 361 576 70M93-10 424 425M258-10 78 429M-10 246 528 88M-16 152 484 400" />
        </g>
        <g fill="var(--map-block)" stroke="var(--map-road-minor)" strokeWidth="2">
          <path d="m72 67 96-22 26 42-97 26Zm188 66 76-23 27 38-91 27Zm-99 103 96-19 21 46-106 25Zm160 76 91-21 11 44-92 26ZM81 297l61-19 17 38-66 22Z" />
        </g>
        <text x="270" y="225" className="hotel-map-label">{location.split(",")[0]}</text>
        <circle cx="477" cy="215" r="24" fill="#216cff" opacity=".15" />
        <path d="M477 184c-16 0-29 13-29 29 0 23 29 53 29 53s29-30 29-53c0-16-13-29-29-29Z" fill="#216cff" />
        <circle cx="477" cy="213" r="9" fill="#fff" />
      </svg>
      <div className="hotel-map-controls">
        <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(value + 0.15, 1.6))}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(value - 0.15, 1))}>−</button>
      </div>
    </div>
  );
}

function ExperienceCard({ experience }) {
  return (
    <article className="hotel-experience-card">
      <div className="hotel-experience-image"><Image src={experience.image} alt={experience.name} fill sizes="(max-width: 700px) 220px, 260px" /></div>
      <div className="hotel-experience-copy"><strong>{experience.name}</strong><span>{experience.kind}</span><small>{experience.price}</small></div>
    </article>
  );
}

function PolicyIcon({ index }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (index < 2) return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  if (index === 2) return <svg {...common}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3" /></svg>;
  if (index === 3) return <svg {...common}><path d="M3 12h18v8H3zM5 12V8h6v4m2 0V6h6v6M6 20v2m12-2v2" /></svg>;
  if (index === 4) return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /><path d="m17 5 2 2 3-3" /></svg>;
  if (index === 5) return <svg {...common}><path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" /></svg>;
  if (index === 6) return <svg {...common}><path d="M3 14h15v4H3zM20 14v4m-4-8 2-3m1 4 2-2" /><path d="m4 4 16 16" /></svg>;
  return <svg {...common}><circle cx="7" cy="8" r="1.5" /><circle cx="11" cy="6" r="1.5" /><circle cx="15" cy="7" r="1.5" /><circle cx="18" cy="10" r="1.5" /><path d="M8 15c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4Z" /></svg>;
}

export default function HotelDetailsPage({ hotel }) {
  const [favorite, setFavorite] = useState(Boolean(hotel.isFavorite));
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [roomQuantities, setRoomQuantities] = useState({});
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const visibleAmenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 6);
  const visibleReviews = showAllReviews ? hotel.reviews : hotel.reviews.slice(0, 3);
  const selectedRoomCount = Object.values(roomQuantities).reduce((total, quantity) => total + quantity, 0);
  const rating = Number(hotel.rating).toFixed(1);
  const city = hotel.location.split(",")[0].trim();
  const country = hotel.location.split(",").at(-1).trim();
  const hotelHeading = hotel.name.toLowerCase().includes(city.toLowerCase())
    ? `${hotel.name}, ${country}`
    : `${hotel.name}, ${hotel.location}`;
  const roomDateSummary = useMemo(() => {
    const format = (date) => new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
    return {
      checkIn: checkIn ? format(checkIn) : "08/10/2025",
      checkOut: checkOut ? format(checkOut) : "09/10/2025",
    };
  }, [checkIn, checkOut]);

  const jumpToRooms = () => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const shareHotel = async () => {
    if (navigator.share) {
      await navigator.share({ title: hotel.name, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="hotel-details-shell">
      <Header />
      <div className="hotel-details-content">
        <header className="hotel-title-row" id="overview">
          <div>
            <h1>{hotelHeading}</h1>
            <p>A curated stay in {hotel.location.split(",")[0]} with thoughtful amenities</p>
          </div>
          <div className="hotel-title-actions">
            <button type="button" className={favorite ? "is-favorite" : ""} aria-label={favorite ? "Remove from saved stays" : "Save this stay"} aria-pressed={favorite} onClick={() => setFavorite(!favorite)}><Icon name="heart" size={21} /></button>
            <button type="button" aria-label="Share this stay" onClick={shareHotel}><Icon name="share" size={20} /></button>
          </div>
        </header>

        <nav className="hotel-section-nav" aria-label="Hotel sections">
          {hotelTabs.map(([label, id], index) => (
            <a className={index === 0 ? "is-active" : ""} href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>

        <HotelGallery hotel={hotel} />

        <section className="hotel-overview-grid">
          <div className="hotel-overview-main">
            <section className="hotel-about">
              <h2>About this stay</h2>
              <p className="hotel-facts">2 guests · Studio · 1 bed · 1.5 baths</p>
              <p className={`hotel-description${showFullDescription ? " is-expanded" : ""}`}>{hotel.description}</p>
              <button type="button" className="hotel-outline-button" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Show less" : "Show all"}
              </button>
            </section>

            <section className="hotel-amenities" id="amenities">
              <h2>What this stay offers</h2>
              <div className="hotel-amenity-grid">
                {visibleAmenities.map((amenity) => (
                  <span className="hotel-amenity" key={amenity}><AmenityIcon amenity={amenity} />{amenity}</span>
                ))}
              </div>
              {hotel.amenities.length > 6 && (
                <button type="button" className="hotel-outline-button" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                  {showAllAmenities ? "Show fewer amenities" : `Show all ${hotel.amenities.length} amenities`}
                </button>
              )}
            </section>
          </div>
          <BookingCard hotel={hotel} onSelectRoom={jumpToRooms} />
        </section>

        <section className="hotel-rooms-section" id="rooms">
          <div className="hotel-section-heading-row">
            <div className="hotel-room-heading">
              <h2>Select rooms</h2>
              {selectedRoomCount > 0 && (
                <span aria-live="polite">
                  {selectedRoomCount} {selectedRoomCount === 1 ? "room" : "rooms"} selected
                </span>
              )}
            </div>
            <div className="hotel-date-range" aria-label="Choose stay dates">
              <label><Icon name="calendar" size={16} /><span>Check-in</span><input aria-label="Check-in date" type="date" value={checkIn} onChange={(event) => {
                const value = event.target.value;
                setCheckIn(value);
                if (checkOut && value >= checkOut) setCheckOut("");
              }} /><small>{roomDateSummary.checkIn}</small></label>
              <span className="hotel-date-arrow"><Icon name="arrow" size={20} /></span>
              <label><Icon name="calendar" size={16} /><span>Check-out</span><input aria-label="Check-out date" type="date" min={checkIn || undefined} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /><small>{roomDateSummary.checkOut}</small></label>
            </div>
          </div>
          <div className="hotel-room-list">
            {hotel.rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                quantity={roomQuantities[room.id] ?? 0}
                onAdd={() => setRoomQuantities((current) => ({
                  ...current,
                  [room.id]: (current[room.id] ?? 0) + 1,
                }))}
                onRemove={() => setRoomQuantities((current) => {
                  const nextQuantity = (current[room.id] ?? 0) - 1;
                  if (nextQuantity <= 0) {
                    const next = { ...current };
                    delete next[room.id];
                    return next;
                  }
                  return { ...current, [room.id]: nextQuantity };
                })}
              />
            ))}
          </div>
        </section>

        <section className="hotel-reviews-section" id="reviews">
          <h2>Reviews</h2>
          <p className="hotel-review-count"><span>{rating}</span> · Excellent {hotel.reviewCount.toLocaleString()} reviews</p>
          <div className="hotel-rating-summary">
            <div className="hotel-overall-rating"><span>Overall Rating</span><strong>{rating}</strong><div className="hotel-rating-bars">{[5, 4, 3, 2, 1].map((number) => <span key={number}><small>{number}</small><i><b style={{ width: number === 5 ? "88%" : `${Math.max(8, 95 - number * 16)}%` }} /></i><small>{number === 5 ? "Excellent" : ""}</small></span>)}</div></div>
            {hotel.reviewCategories.map((category) => (
              <div className="hotel-category-rating" key={category.name}><span>{category.name}</span><strong>{category.rating.toFixed(1)}</strong></div>
            ))}
          </div>
          <div className="hotel-review-grid">{visibleReviews.map((review) => <ReviewCard review={review} key={review.id} />)}</div>
          <button type="button" className="hotel-outline-button" onClick={() => setShowAllReviews(!showAllReviews)}>{showAllReviews ? "Show fewer reviews" : "Show all reviews"}</button>
        </section>

        <section className="hotel-policies-section">
          <h2>Policies</h2>
          <p>Things to know before you book</p>
          <div className="hotel-policy-table">
            {hotel.policies.map((policy, index) => (
              <div className="hotel-policy-row" key={policy.title}>
                <strong><PolicyIcon index={index} />{policy.title}</strong>
                <p>{policy.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hotel-location-section" id="location">
          <h2>Where you’ll stay</h2>
          <p><Icon name="pin" size={16} />{hotel.location}</p>
          <LocationMap location={hotel.location} />
        </section>

        <section className="hotel-experiences-section">
          <div><h2>Discover Experiences Around Your Stay</h2><p>Explore nearby cities with verified stays and transparent pricing</p></div>
          <div className="hotel-experience-list">{hotel.experiences.map((experience) => <ExperienceCard experience={experience} key={experience.name} />)}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
