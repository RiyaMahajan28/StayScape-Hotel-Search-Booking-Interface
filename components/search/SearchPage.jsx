"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PropertyCard } from "@/components/common/PropertyCard";
import { seedProperties } from "@/data/properties";
import { initialFilters } from "@/data/searchFilters";
import { searchProperties } from "@/lib/searchProperties";
import { SearchBox } from "./SearchBox";
import { SearchFilters } from "./SearchFilters";
import "./SearchPage.css";

const PAGE_SIZE = 5;

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseGuestCounts(value) {
  const parsed = Number(value);
  const adults = value && Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
  return { adults, children: 0, rooms: 1 };
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const mobileFilterButtonRef = useRef(null);
  const searchFiltersRef = useRef(null);
  const [sortBy, setSortBy] = useState("top-reviewed");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(seedProperties.filter((property) => property.isFavorite).map((property) => property.id)),
  );

  const locationValue = searchParams.get("location")?.trim() || "Barcelona, Spain";

  const updateFilter = (key, valueOrUpdater) =>
    setFilters((current) => ({
      ...current,
      [key]: typeof valueOrUpdater === "function" ? valueOrUpdater(current[key]) : valueOrUpdater,
    }));

  const toggleFilterValue = (key, value) =>
    updateFilter(key, (selected) =>
      selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
    );

  const toggleFavorite = (propertyId) =>
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(propertyId)) next.delete(propertyId);
      else next.add(propertyId);
      return next;
    });

  const handleSearchSubmit = ({ location, checkIn, checkOut, guestCounts }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (location.trim()) {
      params.set("location", location.trim());
    }
    if (checkIn) params.set("checkIn", checkIn.toISOString());
    else params.delete("checkIn");
    if (checkOut) params.set("checkOut", checkOut.toISOString());
    else params.delete("checkOut");
    params.set("guests", String(Math.max(1, guestCounts.adults || 2)));
    router.push(`/search?${params.toString()}`);
  };

  const filteredProperties = useMemo(
    () => searchProperties(seedProperties, { location: locationValue, filters, sortBy }),
    [locationValue, filters, sortBy],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
  const currentPageResults = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
    document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  useEffect(() => {
    if (!mobileFiltersOpen) return;

    const mobileViewport = window.matchMedia("(max-width: 1024px)");
    if (!mobileViewport.matches) return;

    const previousOverflow = document.body.style.overflow;
    const mobileFilterButton = mobileFilterButtonRef.current;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileFiltersOpen(false);
    };
    const closeOnDesktop = (event) => {
      if (!event.matches) setMobileFiltersOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    mobileViewport.addEventListener("change", closeOnDesktop);
    searchFiltersRef.current?.querySelector(".search-filters-close")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      mobileViewport.removeEventListener("change", closeOnDesktop);
      mobileFilterButton?.focus();
    };
  }, [mobileFiltersOpen]);

  return (
    <main className="search-page-shell">
      <Header />

      <section className="search-hero-section">
        <div className="search-page-topbar">
          {/* Keyed by the URL so the form re-initialises whenever a new search is made. */}
          <SearchBox
            key={searchParams.toString()}
            initialLocation={locationValue}
            initialCheckIn={parseDate(searchParams.get("checkIn"))}
            initialCheckOut={parseDate(searchParams.get("checkOut"))}
            initialGuestCounts={parseGuestCounts(searchParams.get("guests"))}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </section>

      <section className="search-page">
        <div className="search-page-layout">
          {mobileFiltersOpen && (
            <button
              type="button"
              className="mobile-filter-overlay"
              aria-label="Close filters"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}
          <SearchFilters
            filters={filters}
            location={locationValue}
            onFilterChange={updateFilter}
            onToggleValue={toggleFilterValue}
            onResetAll={resetAllFilters}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            drawerRef={searchFiltersRef}
          />

          <section className="search-results-panel" id="search-results">
            <div className="search-results-header">
              <div>
                <h1>
                  Explore {filteredProperties.length}+ Places in {locationValue.split(",")[0] || "Barcelona"}
                </h1>
              </div>
              <div className="search-sort-wrap">
                <label htmlFor="sort-results">Sort by</label>
                <select
                  id="sort-results"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="top-reviewed">Top Reviewed</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="highest-rated">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="search-results-toolbar">
              <button
                ref={mobileFilterButtonRef}
                type="button"
                className="mobile-filter-button"
                aria-expanded={mobileFiltersOpen}
                aria-controls="search-filters"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <svg className="mobile-filter-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 5h16l-6.5 7.4V19l-3 1v-7.6L4 5Z" />
                </svg>
                Filters
              </button>
              <button type="button" className="search-clear-button" onClick={resetAllFilters}>
                Clear all
              </button>
            </div>

            <div className="search-results-grid">
              {currentPageResults.map((property) => (
                <PropertyCard
                  key={property.id}
                  title={property.name}
                  location={property.location}
                  price={`$${property.price}`}
                  rating={property.rating.toFixed(1)}
                  reviewCount={property.reviewCount}
                  image={property.image}
                  deal={property.badge}
                  propertyType={property.type}
                  roomType={property.roomType}
                  size={property.size}
                  distance={`${property.distance.toFixed(1)} km to centre`}
                  amenities={property.amenities}
                  features={property.features}
                  oldPrice={property.oldPrice ? `$${property.oldPrice}` : undefined}
                  priceLabel="per night"
                  availability={property.availability}
                  tags={property.tags}
                  isFavorite={favoriteIds.has(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                  onClick={() => router.push(`/hotel/${property.id}`)}
                  showSearchLayout
                />
              ))}
            </div>

            <div className="search-pagination" aria-label="Search results pagination">
              <button type="button" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={pageNumber === page ? "is-active" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button type="button" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
                Next
              </button>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
