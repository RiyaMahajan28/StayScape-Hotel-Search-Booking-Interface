import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/components/hotel/hotel-details.css";

export default function HotelNotFound() {
  return (
    <main className="hotel-details-shell">
      <Header />
      <section className="hotel-not-found">
        <span aria-hidden="true">⌂</span>
        <h1>We couldn’t find that stay</h1>
        <p>It may have been removed, or the link may be out of date.</p>
        <Link href="/search">Back to search</Link>
      </section>
      <Footer />
    </main>
  );
}
