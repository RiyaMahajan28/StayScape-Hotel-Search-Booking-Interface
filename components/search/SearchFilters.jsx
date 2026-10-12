"use client";

import { useState } from "react";
import {
  DISTANCE_MAX,
  DISTANCE_MIN,
  INITIAL_PRICE_RANGE,
  PRICE_GAP,
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  amenityGroups,
  classificationOptions,
  featureOptions,
  initialExpandedSections,
  locationOptions,
  priceDistribution,
  ratingOptions,
  roomOptions,
  serviceOptions,
  sizeOptions,
  typeOptions,
} from "@/data/searchFilters";
import { AmenityIcon } from "./AmenityIcon";
import { ClassificationStars } from "./ClassificationStars";
import { SearchFilterSection } from "./SearchFilterSection";

const snapPrice = (value) => Math.round(value / PRICE_STEP) * PRICE_STEP;
const toPercent = (price) => (price / PRICE_MAX) * 100;

function CheckboxOptions({ options, selected, onToggle }) {
  return (
    <div className="search-filter-options">
      {options.map((option) => (
        <label key={option} className="search-option-row">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function ChipOptions({ options, selected, onToggle }) {
  return (
    <div className="search-amenity-chips">
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            className={`search-amenity-chip${isSelected ? " is-selected" : ""}`}
            aria-pressed={isSelected}
            onClick={() => onToggle(option)}
          >
            <AmenityIcon amenity={option} />
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SearchFilters({
  filters,
  location,
  onFilterChange,
  onToggleValue,
  onResetAll,
  isOpen,
  onClose,
  drawerRef,
}) {
  const [expandedSections, setExpandedSections] = useState(initialExpandedSections);
  const [activePriceHandle, setActivePriceHandle] = useState("maximum");
  const [minPrice, maxPrice] = filters.priceRange;

  const sectionProps = (key) => ({
    expanded: expandedSections[key],
    onToggle: () => setExpandedSections((current) => ({ ...current, [key]: !current[key] })),
  });
  const setPriceRange = (updater) => onFilterChange("priceRange", updater);
  const mapLocation = location?.toLowerCase() === "all" ? "hotels" : location || "hotels";
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`;

  return (
    <aside
      ref={drawerRef}
      id="search-filters"
      className={`search-filters ${isOpen ? "is-open" : ""}`}
      aria-label="Search filters"
      aria-modal={isOpen ? "true" : undefined}
      role={isOpen ? "dialog" : undefined}
      tabIndex={isOpen ? -1 : undefined}
    >
      <div className="sidebar-map">
        <div className="sidebar-map-image" aria-hidden="true">
          <iframe
            className="sidebar-map-embed"
            src={mapEmbedUrl}
            title={`Map around ${mapLocation}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          className="show-on-map-button"
          href={googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Show ${location || "hotels"} on Google Maps`}
        >
          <svg className="show-on-map-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
            <path d="M9 3v15m6-12v15" />
            <path d="M15 7.5a3 3 0 0 1-6 0 3 3 0 0 1 6 0Z" />
            <path d="m13.2 10-1.2 1.5L10.8 10" />
          </svg>
          <span>Show on Map</span>
        </a>
      </div>

      <div className="search-filters-panel">
        <div className="search-filters-header">
          <span>Filter by:</span>
          <button type="button" className="search-filters-clear" onClick={onResetAll}>
            Clear
          </button>
          <button type="button" className="search-filters-close" aria-label="Close filters" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="search-filter-list">
        <SearchFilterSection
          title="Type of Place"
          {...sectionProps("placeType")}
          className="search-filter-section--place-type"
        >
          <div className="search-type-segmented" role="group" aria-label="Type of Place">
            {typeOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="search-type-segment"
                aria-pressed={
                  option === "Any type"
                    ? filters.types.length === 0
                    : filters.types.length === 1 && filters.types[0] === option
                }
                onClick={() => onFilterChange("types", option === "Any type" ? [] : [option])}
              >
                {option}
              </button>
            ))}
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="Price Range"
          {...sectionProps("price")}
          className="search-filter-section--price-range"
          onReset={() => setPriceRange(INITIAL_PRICE_RANGE)}
        >
          <div className="search-price-range">
            <p className="search-price-subtitle">Nightly prices including fees and taxes</p>
            <div
              className="search-price-control"
              style={{
                "--price-min-position": `${toPercent(minPrice)}%`,
                "--price-max-position": `${toPercent(maxPrice)}%`,
              }}
            >
              <div className="search-price-histogram" aria-hidden="true">
                {priceDistribution.map((height, index) => {
                  const midpoint = ((index + 0.5) / priceDistribution.length) * 100;
                  const isSelected =
                    midpoint >= toPercent(minPrice) && midpoint <= toPercent(maxPrice);

                  return (
                    <span
                      key={`price-bar-${index}`}
                      className={`search-price-bar${isSelected ? " is-selected" : ""}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              <div className="search-price-track" aria-hidden="true" />
              <input
                className={`search-price-thumb search-price-thumb--minimum${activePriceHandle === "minimum" ? " is-active" : ""}`}
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={minPrice}
                aria-label="Minimum price"
                aria-valuetext={`$${minPrice}`}
                onPointerDown={() => setActivePriceHandle("minimum")}
                onPointerUp={() => setActivePriceHandle("maximum")}
                onChange={(event) => {
                  const nextMinimum = Number(event.target.value);
                  setPriceRange(([, maximum]) => [
                    Math.min(nextMinimum, maximum - PRICE_GAP),
                    maximum,
                  ]);
                }}
              />
              <input
                className={`search-price-thumb search-price-thumb--maximum${activePriceHandle === "maximum" ? " is-active" : ""}`}
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maxPrice}
                aria-label="Maximum price"
                aria-valuetext={`$${maxPrice}${maxPrice >= 1500 ? "+" : ""}`}
                onPointerDown={() => setActivePriceHandle("maximum")}
                onPointerUp={() => setActivePriceHandle("maximum")}
                onChange={(event) => {
                  const nextMaximum = Number(event.target.value);
                  setPriceRange(([minimum]) => [
                    minimum,
                    Math.max(nextMaximum, minimum + PRICE_GAP),
                  ]);
                }}
              />
            </div>
            <div className="search-price-values">
              <label className="search-price-value-field">
                <span>Minimum</span>
                <span className="search-price-input-wrap">
                  <span aria-hidden="true">$</span>
                  <input
                    type="number"
                    min={PRICE_MIN}
                    max={maxPrice - PRICE_GAP}
                    step={PRICE_STEP}
                    value={minPrice}
                    aria-label="Minimum price value"
                    onChange={(event) => {
                      const inputValue = Number(event.target.value);
                      if (!Number.isFinite(inputValue)) return;
                      const nextMinimum = snapPrice(inputValue);
                      setPriceRange(([, maximum]) => [
                        Math.max(PRICE_MIN, Math.min(nextMinimum, maximum - PRICE_GAP)),
                        maximum,
                      ]);
                    }}
                  />
                </span>
              </label>
              <label className="search-price-value-field">
                <span>Maximum</span>
                <span className="search-price-input-wrap">
                  <span aria-hidden="true">$</span>
                  <input
                    type="number"
                    min={minPrice + PRICE_GAP}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={maxPrice}
                    aria-label="Maximum price value"
                    onChange={(event) => {
                      const inputValue = Number(event.target.value);
                      if (!Number.isFinite(inputValue)) return;
                      const nextMaximum = snapPrice(inputValue);
                      setPriceRange(([minimum]) => [
                        minimum,
                        Math.min(PRICE_MAX, Math.max(nextMaximum, minimum + PRICE_GAP)),
                      ]);
                    }}
                  />
                  {maxPrice >= 1500 && <span aria-hidden="true">+</span>}
                </span>
              </label>
            </div>
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="Rooms and Beds"
          {...sectionProps("roomBeds")}
          onReset={() => onFilterChange("sizes", [])}
        >
          <div className="search-filter-options compact">
            {roomOptions.map((option) => (
              <label key={option} className="search-option-row">
                <input type="checkbox" checked={false} readOnly />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="Room Size"
          {...sectionProps("roomSize")}
          onReset={() => onFilterChange("sizes", [])}
        >
          <CheckboxOptions
            options={sizeOptions}
            selected={filters.sizes}
            onToggle={(option) => onToggleValue("sizes", option)}
          />
        </SearchFilterSection>

        <SearchFilterSection
          title="Distance from Centre"
          {...sectionProps("distance")}
          className="search-filter-section--distance"
          onReset={() => onFilterChange("distance", DISTANCE_MAX)}
        >
          <div className="search-distance-filter">
            <div className="search-distance-labels" aria-hidden="true">
              <span>1 km</span>
              <span>10+ km</span>
            </div>
            <div
              className="search-distance-slider"
              style={{
                "--distance-fill": `${((filters.distance - DISTANCE_MIN) / (DISTANCE_MAX - DISTANCE_MIN)) * 100}%`,
              }}
            >
              <div className="search-distance-track" aria-hidden="true">
              </div>
              <input
                type="range"
                min={DISTANCE_MIN}
                max={DISTANCE_MAX}
                step={1}
                value={filters.distance}
                aria-label="Distance from centre"
                aria-valuetext={
                  filters.distance === DISTANCE_MAX
                    ? "10 or more kilometers"
                    : `${filters.distance} kilometers`
                }
                onChange={(event) => onFilterChange("distance", Number(event.target.value))}
              />
              <output className="search-distance-value" aria-live="polite">
                {filters.distance === DISTANCE_MAX ? "10+ km" : `${filters.distance} km`}
              </output>
            </div>
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="Guest Review Score"
          {...sectionProps("rating")}
          onReset={() => onFilterChange("ratings", [])}
        >
          <CheckboxOptions
            options={ratingOptions}
            selected={filters.ratings}
            onToggle={(option) => onToggleValue("ratings", option)}
          />
        </SearchFilterSection>

        <SearchFilterSection
          title="Property Classification"
          {...sectionProps("classification")}
          className="search-filter-section--classification"
          onReset={() => onFilterChange("classifications", [])}
        >
          <div className="search-filter-options">
            {classificationOptions.map((option) => {
              const rating = option === "No rating" ? 0 : Number(option[0]);

              return (
                <label key={option} className="search-option-row search-classification-option">
                  <input
                    type="checkbox"
                    checked={filters.classifications.includes(option)}
                    onChange={() => onToggleValue("classifications", option)}
                  />
                  {rating > 0 && <ClassificationStars rating={rating} />}
                  <span className="search-classification-label">{option}</span>
                </label>
              );
            })}
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="Amenities"
          {...sectionProps("amenities")}
          className="search-filter-section--amenities"
          onReset={() => onFilterChange("amenities", [])}
        >
          <div className="search-amenity-groups">
            {amenityGroups.map((group) => (
              <section className="search-amenity-group" key={group.title} aria-label={`${group.title} amenities`}>
                <h3>{group.title}</h3>
                <ChipOptions
                  options={group.options}
                  selected={filters.amenities}
                  onToggle={(option) => onToggleValue("amenities", option)}
                />
              </section>
            ))}
          </div>
        </SearchFilterSection>

        <SearchFilterSection
          title="On-site Services"
          {...sectionProps("services")}
          onReset={() => onFilterChange("services", [])}
        >
          <ChipOptions
            options={serviceOptions}
            selected={filters.services}
            onToggle={(option) => onToggleValue("services", option)}
          />
        </SearchFilterSection>

        <SearchFilterSection
          title="Features"
          {...sectionProps("features")}
          onReset={() => onFilterChange("features", [])}
        >
          <ChipOptions
            options={featureOptions}
            selected={filters.features}
            onToggle={(option) => onToggleValue("features", option)}
          />
        </SearchFilterSection>

        <SearchFilterSection
          title="Location"
          {...sectionProps("location")}
          onReset={() => onFilterChange("locations", [])}
        >
          <ChipOptions
            options={locationOptions}
            selected={filters.locations}
            onToggle={(option) => onToggleValue("locations", option)}
          />
        </SearchFilterSection>
        </div>
      </div>
    </aside>
  );
}
