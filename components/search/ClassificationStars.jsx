export function ClassificationStars({ rating }) {
  return (
    <span className="search-classification-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={`classification-star-${index}`}
          viewBox="0 0 20 20"
          className={index < rating ? "is-filled" : "is-empty"}
        >
          <path d="m10 1.6 2.6 5.3 5.9.9-4.25 4.15 1 5.85L10 15.05l-5.25 2.75 1-5.85L1.5 7.8l5.9-.9L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}
