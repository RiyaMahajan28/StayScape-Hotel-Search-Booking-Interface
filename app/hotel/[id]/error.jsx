"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/components/hotel/hotel-details.css";

export default function HotelError({ error, reset }) {
  useEffect(() => {
    console.error("Unable to load hotel details.", error);
  }, [error]);

  return (
    <main className="hotel-details-shell">
      <Header />
      <section className="hotel-not-found">
        <span aria-hidden="true">!</span>
        <h1>We couldn’t load this stay</h1>
        <p>Please try again, or return to search to find another place to stay.</p>
        <div className="hotel-error-actions">
          <button type="button" onClick={reset}>Try again</button>
          <Link href="/search">Back to search</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
