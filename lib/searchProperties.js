import { DISTANCE_MAX } from "@/data/searchFilters";

const ratingMatchers = {
  "4.5+": (rating) => rating >= 4.5,
  "4.0+": (rating) => rating >= 4.0,
  "3.5+": (rating) => rating >= 3.5,
  "No rating": (rating) => rating < 3.5,
};

const sorters = {
  "top-reviewed": (a, b) => b.reviewCount - a.reviewCount,
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  "highest-rated": (a, b) => b.rating - a.rating,
};

const includesAll = (values, selected) => selected.every((value) => values.includes(value));

export function searchProperties(properties, { location, filters, sortBy }) {
  const normalizedLocation = location.toLowerCase();
  const [minPrice, maxPrice] = filters.priceRange;

  const matches = properties.filter((property) => {
    if (filters.types.length > 0 && !filters.types.includes(property.type)) return false;
    if (filters.sizes.length > 0 && !filters.sizes.includes(property.size)) return false;
    if (filters.distance < DISTANCE_MAX && property.distance > filters.distance) return false;
    if (
      filters.ratings.length > 0 &&
      !filters.ratings.some((rating) => ratingMatchers[rating]?.(property.rating))
    ) {
      return false;
    }
    if (
      filters.classifications.length > 0 &&
      !filters.classifications.includes(property.classification)
    ) {
      return false;
    }
    if (!includesAll(property.amenities, filters.amenities)) return false;
    if (!includesAll(property.services, filters.services)) return false;
    if (!includesAll(property.features, filters.features)) return false;
    if (
      filters.locations.length > 0 &&
      !filters.locations.some(
        (tag) => property.features.includes(tag) || property.amenities.includes(tag),
      )
    ) {
      return false;
    }
    if (property.price < minPrice || property.price > maxPrice) return false;

    return (
      !normalizedLocation ||
      normalizedLocation === "all" ||
      property.city.toLowerCase().includes(normalizedLocation) ||
      property.location.toLowerCase().includes(normalizedLocation)
    );
  });

  return matches.sort(sorters[sortBy] ?? sorters["top-reviewed"]);
}
