const amenityShapes = {
  "Air Conditioning": <><path d="M12 2v20M4.9 5.5l14.2 13M19.1 5.5l-14.2 13M2 12h20" /><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2M4.5 9.5l2 2.5-2 2.5M19.5 9.5l-2 2.5 2 2.5" /></>,
  "Wi-Fi": <><path d="M3 9a14 14 0 0 1 18 0M6 12a9.5 9.5 0 0 1 12 0M9 15a5 5 0 0 1 6 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></>,
  "BBQ Grill": <><path d="M4 10h16l-2 5H6l-2-5ZM7 15l-2 6m12-6 2 6M8 18h8M7 7c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3" /></>,
  "Washing machine": <><rect x="4" y="2.5" width="16" height="19" rx="2" /><path d="M4 7h16" /><circle cx="12" cy="14" r="4.5" /><circle cx="8" cy="5" r=".7" fill="currentColor" stroke="none" /><circle cx="11" cy="5" r=".7" fill="currentColor" stroke="none" /></>,
  "TV": <><rect x="3" y="4" width="18" height="14" rx="1.5" /><path d="M8 22h8m-4-4v4" /></>,
  "Kitchen": <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M7 5.5h.01M10 5.5h.01M7 12h10v6H7z" /></>,
  "Breakfast Included": <><path d="M4 6.5c0-1.7 1.6-3 3.5-3h9c1.9 0 3.5 1.3 3.5 3v11c0 1.7-1.6 3-3.5 3h-9C5.6 20.5 4 19.2 4 17.5v-11Z" /><path d="M8 8c1.5 1 1.5 2 0 3m4-3c1.5 1 1.5 2 0 3m4-3c1.5 1 1.5 2 0 3" /></>,
  "Pool": <><path d="M3 13c2.2-2 4.4 2 6.6 0s4.4-2 6.7 0 4.4 2 6.7 0M3 18c2.2-2 4.4 2 6.6 0s4.4-2 6.7 0 4.4 2 6.7 0M7 8V4m5 4V3m5 5V5" /></>,
  "Hot Tub": <><path d="M3 11h18l-1.5 8h-15L3 11ZM5 22h14m-12-3-1 3m12-3 1 3M7 8c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3" /></>,
  "Free Parking": <><circle cx="12" cy="12" r="9.5" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>,
  "Wellness": <><path d="M20.5 3.5C11 3 4 7 4 13a6 6 0 0 0 6 6c6 0 10-7 10.5-15.5Z" /><path d="M3 21c3-6 7-9 13-12" /></>,
  "Petrol Station": <><path d="M5 21V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v17M3 21h15M8 6h5v5H8zM16 8h2l3 3v6a2 2 0 0 1-4 0v-4" /></>,
  "Gym": <><path d="M3 9v6m3-9v12m12-12v12m3-9v6M6 12h12" /></>,
  "Family Room": <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-1a6 6 0 0 1 12 0v1H3Zm12-5a5 5 0 0 1 6 5h-4" /></>,
  "Bar": <><path d="M4 3h16l-8 9-8-9Zm8 9v9m-4 0h8" /></>,
  "Terrace": <><path d="M3 20h18M5 20V9l7-5 7 5v11M8 12h8M8 16h8" /></>,
  "Restaurant": <><path d="M6 2v7m-3-7v4a3 3 0 0 0 6 0V2M6 9v13m10-20v19m0-19c3 2 4 6 0 8" /></>,
  "Indoor Fireplace": <><path d="M4 21V4h16v17H4Zm3 0v-5a5 5 0 0 1 10 0v5" /><path d="M12 17c-2-2 1-3 1-5 2 2 3 4 1 6" /></>,
  "Smoking Allowed": <><path d="M3 15h15v4H3zM20 15v4m1-5a3 3 0 0 0 0-5m-3 5a3 3 0 0 0 0-5M7 12c-1-1 1-2 0-3" /></>,
  "24-hour Front Desk": <><circle cx="10" cy="8" r="4" /><path d="M3 21v-2a7 7 0 0 1 14 0v2H3Zm15-13h3m-1.5-1.5v3M18 16h4v5h-4z" /></>,
  "Room service": <><path d="M3 19h18M5 19a7 7 0 0 1 14 0M12 5v2m-4-4 1 2m7-2-1 2" /><circle cx="12" cy="4" r="1" /></>,
  "Luggage Storage": <><rect x="6" y="5" width="12" height="16" rx="2" /><path d="M9 5V3h6v2M9 9v8m6-8v8M3 9v8m18-8v8" /></>,
  "Airport Shuttle": <><path d="M3 14h18l-2-6H5l-2 6Zm2 0v4h14v-4M7 18v2m10-2v2M7 11h.01M17 11h.01" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /></>,
  "Private Beach Area": <><path d="M3 21 20 4M10 6c4-3 8-2 10 0-1 4-4 6-8 5m-1-4c-3 1-5 4-4 8" /><path d="M4 20a9 9 0 0 1 7-3" /></>,
  Waterfront: <><path d="M3 5c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 11c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0" /><path d="M12 2v3m-2-1 2 1 2-1" /></>,
};

const fallbackShape = <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v10m-5-5h10" /></>;

export function AmenityIcon({ amenity }) {
  return (
    <svg className="search-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {amenityShapes[amenity] ?? fallbackShape}
    </svg>
  );
}
