"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/home";

const AUTOPLAY_INTERVAL_MS = 2000;

export function ReviewsCarousel() {
  const cardsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const moveReview = (direction) =>
    setActiveIndex((current) => (current + direction + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % reviews.length),
      AUTOPLAY_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = cardsRef.current;
    const card = container?.children[activeIndex];

    if (!container || !card) return;

    const offset = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section className="figma-reviews">
      <div className="figma-reviews__panel">
        <div className="figma-reviews__inner">
          <div className="figma-reviews__intro">
            <Image
              className="figma-reviews__badge"
              src="/testimonials.png"
              alt="Testimonials"
              width={264}
              height={140}
            />

            <h2>What our clients are saying about us?</h2>

            <p>Real experiences from travelers who booked hostels with us</p>
          </div>

          <div
            className="figma-reviews__slider"
            aria-label="Testimonials carousel"
          >

            <div className="figma-reviews__cards" ref={cardsRef}>
              {reviews.map((review, index) => (
                <article
                  key={review.name}
                  className={`figma-review-card ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                >
                  <div className="figma-review-card__header">
                    <Image src={review.image} alt={review.name} width={50} height={50} />
                    <div className="figma-review-card__meta">
                      <strong>{review.name}</strong>
                      <span>{review.location}</span>
                    </div>
                    <div
                      className="figma-review-card__stars"
                      aria-label="5 star rating"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>

                  <p>{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="figma-reviews__nav" aria-label="Review navigation">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => moveReview(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => moveReview(1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
