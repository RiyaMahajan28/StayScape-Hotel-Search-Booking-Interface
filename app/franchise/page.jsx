import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { benefits, franchiseSteps, partnerFaqs, partnerTestimonials } from "@/data/franchise";
import { backgroundImageSet } from "@/lib/images";

const heroBackground = backgroundImageSet({
  src: "/franchise_hero.png",
  width: 1440,
  height: 950,
});

export default function FranchisePage() {
  return (
    <main>
      <Header />
      <section className="franchise-hero" style={{ "--franchise-hero-image": heroBackground }}>
        <div className="franchise-hero-overlay">
          <div className="franchise-hero-content">
            <div className="trust-badge">
              <span className="check-icon">✓</span>
              <span>Trusted hostel booking platform</span>
            </div>
            <h1>Own a Soulea. Keep 100% of your revenue.</h1>
            <p>
              List your property, set your price, and keep what you earn. We
              provide brand, tech, and growth.
            </p>
            <div className="franchise-hero-actions">
              <Link href="/plp" className="btn-primary">
                Create your listing <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="franchise-why">
        <div className="section-container">
          <div className="section-header">
            <p className="eyebrow">Why partner with us</p>
            <h2>Everything your hostel needs to thrive</h2>
            <p>
              From first listing to fully automated bookings, we handle the
              tech.
            </p>
          </div>
          <div className="why-grid">
            {benefits.map(([icon, title, desc]) => (
              <div className="why-card" key={title}>
                <div className="why-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="franchise-how">
        <div className="section-container">
          <div className="section-header light">
            <h2>How you build & start your business with Soulea</h2>
            <h4>Start your franchise in 3 simple steps</h4>
          </div>
          <div className="how-content">
            <div className="how-images">
              <div className="how-main-image">
                <Image
                  src="/franchise_building1.png"
                  alt="Franchise process"
                  width={600}
                  height={372}
                />
              </div>
              <div className="how-secondary-images">
                <div>
                  <Image src="/franchise_building2.png" alt="Step 2" width={266} height={347} />
                </div>
                <div>
                  <Image src="/franchise_building3.png" alt="Step 3" width={225} height={291} />
                </div>
              </div>
            </div>
            <div className="how-steps">
              {franchiseSteps.map(([step, title, desc]) => (
                <div className="step-card" key={step}>
                  <div className="step-number">{step}</div>
                  <div className="step-content">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <Link href="/plp">Learn more →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="franchise-testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <Image src="/testimonials.png" alt="" width={264} height={140} />
            <h2>What our partners say</h2>
            <p>Real results from real hostel owners.</p>
          </div>
          <div className="testimonials-slider">
            {partnerTestimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.name}>
                <div className="testimonial-header">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.location}</span>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
                <p>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="franchise-faq">
        <div className="faq-container">
          <div className="faq-header">
            <h2>FAQ for partners</h2>
            <h4>Everything you need to know before getting started.</h4>
          </div>
          <div className="faq-content">
            <div className="faq-list">
              {partnerFaqs.map((question) => (
                <div className="faq-item" key={question}>
                  <button className="faq-question" type="button">
                    <span>{question}</span>
                    <span className="faq-icon">+</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="faq-contact">
              <div className="faq-question-mark">
                <Image
                  src="/any_Questions.png"
                  alt="Any question"
                  className="faq-question-image"
                  width={372}
                  height={410}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="franchise-form-section" id="franchise-form">
        <div className="form-container">
          <div className="form-header">
            <h2>Start your franchise journey</h2>
            <p>
              Fill in your details and a partner specialist will be in touch
              within 24 hours.
            </p>
          </div>
          <form className="franchise-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" placeholder="Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="12345" />
              </div>
              <div className="form-group">
                <label>City / Location</label>
                <input type="text" placeholder="California" />
              </div>
            </div>
            <button type="submit" className="btn-submit">
              Get started
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
