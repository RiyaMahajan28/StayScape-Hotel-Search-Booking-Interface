import { Header } from "@/components/layout/Header";
import "@/components/hotel/hotel-details.css";

export default function HotelLoading() {
  return (
    <main className="hotel-details-shell">
      <Header />
      <div className="hotel-loading" role="status" aria-label="Loading hotel details">
        <span />
        <span />
        <span />
      </div>
    </main>
  );
}
