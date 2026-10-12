export const typeOptions = ["Any type", "Room", "Entire home"];
export const PRICE_MIN = 0;
export const PRICE_MAX = 2500;
export const PRICE_STEP = 50;
export const PRICE_GAP = 50;
export const INITIAL_PRICE_RANGE = [50, 1500];
export const DISTANCE_MIN = 1;
export const DISTANCE_MAX = 10;
export const priceDistribution = [
  5, 7, 10, 14, 18, 24, 30, 38, 46, 54, 62, 72, 82, 92, 100, 94, 84, 76, 68, 61,
  55, 50, 46, 42, 39, 36, 33, 30, 27, 24, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3,
];
export const roomOptions = ["1+ bedrooms", "2+ bedrooms", "3+ bedrooms", "4+ bedrooms"];
export const sizeOptions = ["Small", "Medium", "Large"];
export const ratingOptions = ["4.5+", "4.0+", "3.5+", "No rating"];
export const classificationOptions = ["5-star", "4-star", "3-star", "2-star", "1-star", "No rating"];
export const amenityOptions = [
  "Air Conditioning",
  "Wi-Fi",
  "BBQ Grill",
  "Washing machine",
  "TV",
  "Kitchen",
  "Breakfast Included",
  "Pool",
  "Hot Tub",
  "Free Parking",
  "Wellness",
  "Petrol Station",
  "Gym",
  "Family Room",
  "Bar",
  "Terrace",
  "Restaurant",
  "Indoor Fireplace",
  "Smoking Allowed",
];
export const amenityGroups = [
  { title: "Popular", options: amenityOptions.slice(0, 6) },
  { title: "Essentials", options: amenityOptions.slice(6) },
];
export const serviceOptions = [
  "24-hour Front Desk",
  "Room service",
  "Luggage Storage",
  "Airport Shuttle",
];
export const featureOptions = [
  "Breakfast Included",
  "Pool",
  "Hot Tub",
  "Free Parking",
  "Wellness",
  "Kitchen",
  "Petrol Station",
  "Gym",
  "Family Room",
  "Bar",
  "Terrace",
  "Smoking Allowed",
  "Indoor Fireplace",
  "Restaurant",
];
export const locationOptions = ["Private Beach Area", "Waterfront"];


export const initialFilters = {
  priceRange: INITIAL_PRICE_RANGE,
  types: [],
  sizes: [],
  distance: DISTANCE_MAX,
  ratings: [],
  classifications: [],
  amenities: [],
  services: [],
  features: [],
  locations: [],
};

export const initialExpandedSections = {
  placeType: true,
  price: true,
  roomBeds: true,
  roomSize: true,
  distance: true,
  rating: true,
  classification: true,
  amenities: true,
  services: true,
  features: true,
  location: true,
};
