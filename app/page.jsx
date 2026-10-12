import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { PropertyCard } from "@/components/common/PropertyCard";
import { bookingSteps, ctaImage, featuredHostels, trustItems } from "@/data/home";
import { unsplashPhoto } from "@/lib/images";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <DestinationsSection />
      <section className="purple-section" id="hostels">
        <div className="section-heading light">
          <div>
            <h2>Top Hostels you can book right now</h2>
            <p>Verified stays with transparent pricing. No hidden fees.</p>
          </div>
          <Link className="view-button" href="#contact">
            View More <b>›</b>
          </Link>
        </div>
        <div className="hostel-grid">
          {featuredHostels.map((hostel) => (
            <PropertyCard
              key={hostel.title}
              {...hostel}
              image={unsplashPhoto(hostel.image)}
            />
          ))}
        </div>
      </section>
      <section className="site-section trust">
        <p className="eyebrow">Why travellers choose us</p>
        <h2>Everything you need, nothing you don&apos;t</h2>
        <div className="trust-grid">
          {trustItems.map(([icon, title]) => (
            <article className="trust-item" key={title}>
              <i>{icon}</i>
              <strong>{title}</strong>
              <p>
                Everything is checked and reviewed by real travellers, so your
                trip is simple and reliable.
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="steps-section">
        <div className="steps-copy">
          <p className="eyebrow">Made for modern travellers</p>
          <h2>Book your stay in 3 simple steps</h2>
          <p>Find, compare, and book hostels with no hidden fees</p>
          <div className="traveler-collage">
            <div className="traveler-route" />
            <Image src="/travelers2.png" alt="Friends travelling" width={559} height={347} />
            <Image src="/travelers3.png" alt="Travel luggage" width={268} height={347} />
            <Image src="/travelers4.png" alt="Tropical travel" width={225} height={291} />
          </div>
        </div>
        <div className="steps-list">
          {bookingSteps.map((step) => (
            <article key={step.title}>
              <i>
                <Image
                  src={step.icon}
                  alt={step.alt}
                  className="step-icon-image"
                  width={30}
                  height={30}
                  unoptimized
                />
              </i>
              <div>
                <strong>{step.title}</strong>
                <p>
                  Browse verified hostels, check prices, and choose what feels
                  right.
                </p>
                <Link href="#explore">Learn more →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ReviewsCarousel />
      <section className="cta">
        <div>
          <h2>
            Reach more travelers, fill
            <br />
            more beds
          </h2>
          <p>
            List your hostel, manage bookings, and grow your business with us.
          </p>
          <Link href="#contact">Get started</Link>
        </div>
        <Image src={unsplashPhoto(ctaImage)} alt="Hostel pool" width={800} height={534} />
      </section>
      <Footer />
    </main>
  );
}
