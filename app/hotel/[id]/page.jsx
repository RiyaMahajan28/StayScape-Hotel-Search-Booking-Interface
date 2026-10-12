import { notFound } from "next/navigation";
import HotelDetailsPage from "@/components/hotel/HotelDetailsPage";
import { getHotelById } from "@/data/hotels";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) return { title: "Hotel not found | Souléa" };

  return {
    title: `${hotel.name} | Souléa`,
    description: `Explore rooms, amenities and reviews for ${hotel.name} in ${hotel.location}.`,
  };
}

export default async function HotelRoutePage({ params }) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) notFound();

  return <HotelDetailsPage hotel={hotel} />;
}
