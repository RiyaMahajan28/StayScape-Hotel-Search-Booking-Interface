import { seedProperties } from "./properties";

const hotelImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
];

const roomImages = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
];

const roomTypes = [
  { name: "Deluxe 4 Bed Mixed Dorm", detail: "Attached bathroom", beds: "4 single beds", size: "40 m²", offset: 0 },
  { name: "Standard 4 Bed Mixed Dorm", detail: "Shared bathroom", beds: "4 single beds", size: "40 m²", offset: 24 },
  { name: "Deluxe 6 Bed Mixed Dorm", detail: "Attached bathroom", beds: "6 single beds", size: "48 m²", offset: 36 },
  { name: "Standard 4 Bed Mixed Dorm", detail: "Shared bathroom", beds: "4 single beds", size: "40 m²", offset: 42 },
  { name: "Premium Room", detail: "With bathtub", beds: "1 king bed", size: "50 m²", offset: 110 },
  { name: "Deluxe Room", detail: "Attached balcony", beds: "1 king bed", size: "45 m²", offset: 88 },
];

const reviewAuthors = [
  { name: "Sara Mohamed", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" },
  { name: "Daniel R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" },
  { name: "Maya Thompson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80" },
  { name: "Sara Mohamed", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" },
  { name: "Daniel R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" },
  { name: "Maya Thompson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80" },
];

const reviewComments = [
  "We had an amazing stay. The room was comfortable, the team was lovely, and the location made it easy to explore the city.",
  "A beautiful place to stay, with thoughtful details and everything we needed close by. We would happily come back.",
  "The stay was exactly as described. Clean, welcoming, and a wonderful base for discovering the neighbourhood.",
  "The staff made us feel at home from the moment we arrived. Great amenities and a comfortable room.",
  "A lovely stay in a convenient location. The room was spotless and the check-in process was simple.",
  "Everything was easy and comfortable, and the local recommendations made our trip even better.",
];

const policies = [
  ["Check-in", "From 15:00 to 18:00\nYou’ll need to let the property know in advance what time you’ll arrive."],
  ["Check-out", "From 8:00 to 11:00"],
  ["Cancellation/prepayment", "Cancellation and prepayment policies vary according to accommodation type. Please check the conditions for your selected room."],
  ["Children and beds", "Child policies and extra bed information depend on the room selected. Please check the room details before booking."],
  ["No age restriction", "Guests of all ages are welcome."],
  ["Quiet hours", "Guests must be quiet between 22:00 and 10:00."],
  ["Smoking", "Smoking is not allowed."],
  ["Pets", "Pets are not allowed."],
];

const experiences = [
  { name: "Venice", kind: "Country Italy", price: "From $92 / night", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=600&q=80" },
  { name: "Bali", kind: "Country Bali", price: "From $92 / night", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" },
  { name: "Bangkok", kind: "Country Thailand", price: "From $92 / night", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80" },
  { name: "Lisbon", kind: "Country Portugal", price: "From $92 / night", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=80" },
];

const formatAmenity = (amenity) => {
  if (amenity === "Wi-Fi") return "Free Wireless Internet";
  if (amenity === "Air Conditioning") return "Air conditioning";
  return amenity;
};

function createHotelDetails(property) {
  const amenities = [
    ...new Set([...property.amenities, ...property.services, ...property.features].map(formatAmenity)),
  ];

  return {
    ...property,
    hotelType: property.type,
    description: `${property.name} is a welcoming place to stay in ${property.location}, thoughtfully set up for a comfortable city break. Enjoy well-appointed rooms, helpful on-site amenities and an easy base for exploring the local neighbourhood.`,
    gallery: [property.image, ...hotelImages.slice(1)],
    host: {
      name: "Selea",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      label: "Hosted by Selea",
      verified: true,
    },
    startingPrice: property.price,
    currency: "USD",
    amenities,
    rooms: roomTypes.map((room, index) => ({
      id: `${property.id}-room-${index + 1}`,
      ...room,
      image: roomImages[index],
      price: property.price + room.offset,
      available: index < 4 ? "10% off" : "Limited rooms",
      perks: index % 2 === 0
        ? ["Free cancellation", "Spa access", "Breakfast included"]
        : ["Free cancellation", "Sea access", "Breakfast included"],
    })),
    reviewCategories: [
      { name: "Amenities", rating: 5 },
      { name: "Cleanliness", rating: 5 },
      { name: "Communication", rating: 5 },
      { name: "Location", rating: 5 },
      { name: "Value", rating: 5 },
    ],
    reviews: reviewAuthors.map((author, index) => ({
      id: `${property.id}-review-${index + 1}`,
      ...author,
      date: ["June 2025", "May 2025", "April 2025", "March 2025", "February 2025", "January 2025"][index],
      rating: 5,
      text: reviewComments[index],
    })),
    policies: policies.map(([title, description]) => ({ title, description })),
    experiences,
  };
}

export function getHotelById(id) {
  const property = seedProperties.find((item) => item.id === id);
  return property ? createHotelDetails(property) : null;
}
