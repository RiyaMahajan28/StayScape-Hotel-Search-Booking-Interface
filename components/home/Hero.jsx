"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchBox } from "@/components/search/SearchBox";
import { backgroundImageSet } from "@/lib/images";

const heroBackground = backgroundImageSet({ src: "/hero.png", width: 1440, height: 882 });

export function Hero() {
  const router = useRouter();

  return (
    <section className="hero" style={{ "--hero-image": heroBackground }}>
      <div className="hero-overlay">
        <p className="eyebrow white">
          ◉ &nbsp; Trusted hostel booking platform
        </p>
        <h1>
          Find the perfect Zostel
          <br />
          for your next trip
        </h1>
        <p>
          Book dorm beds or private rooms with zero commission. No hidden fees!
        </p>
        <div className="hero-actions">
          <Link href="#explore">Explore stays ↗</Link>
          <button>▶</button>
          <span>How it Works</span>
        </div>
      </div>
      <SearchBox
        onSubmit={({ location, checkIn, checkOut, guestCounts }) => {
          const params = new URLSearchParams();
          params.set("location", location.trim() || "New York, USA");
          if (checkIn) params.set("checkIn", checkIn.toISOString());
          if (checkOut) params.set("checkOut", checkOut.toISOString());
          params.set("guests", String(Math.max(1, guestCounts.adults || 2)));
          router.push(`/search?${params.toString()}`);
        }}
      />
    </section>
  );
}
