import Image from "next/image";
import Link from "next/link";
import {
  footerCompanyLinks,
  footerExploreLinks,
  footerSocialLinks,
} from "@/data/navigation";

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function FooterLinks({ title, links }) {
  return (
    <div className="footer-col">
      <h6>{title}</h6>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ type }) {
  switch (type) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 8h2V4h-2.1C11.8 4 10 5.6 10 8.2V10H8v4h2v6h4v-6h2.5l.5-4H14V8.5c0-.8.6-1.5 1.3-1.5H16V4h-1.7C13.1 4 14 5.5 14 8Z"
            {...iconStroke}
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" {...iconStroke} />
          <circle cx="12" cy="12" r="4" {...iconStroke} />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" {...iconStroke} />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 9v8M7 6.5h.01M11 17v-4.5c0-1.4 1-2.5 2.5-2.5S16 11 16 12.5V17M11 9v8"
            {...iconStroke}
          />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-brand-block">
          <Link href="/" className="footer-brand" aria-label="Souléa home">
            <Image src="/onlyLogo.png" alt="Souléa logo" width={94} height={78} />
            <span>soulea</span>
          </Link>
          <p>Simplifying stays for everyone</p>
          <a className="footer-email" href="mailto:support@yourbrand.com">
            <span className="footer-email-icon" aria-hidden="true">
              ✉
            </span>
            <span>support@yourbrand.com</span>
          </a>
        </div>

        <FooterLinks title="Company" links={footerCompanyLinks} />

        <FooterLinks title="Explore" links={footerExploreLinks} />

        <div className="footer-newsletter">
          <h6>Get the best hostel deals, first</h6>
          <form className="newsletter-form" action="#" method="get">
            <div className="newsletter-input-wrap">
              <span className="newsletter-icon" aria-hidden="true">
                ✉
              </span>
              <input
                type="email"
                aria-label="Enter your email"
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" aria-label="Submit email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h12M13 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-support-grid">
        <div className="support-item support-call">
          <div className="support-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path
                d="M11.5 8.3a13 13 0 0 1 1.5 3.7 1.3 1.3 0 0 1-.8 1.6l-1.7.6a12.6 12.6 0 0 0 6.4 6.4l.7-1.7a1.3 1.3 0 0 1 1.5-.8c1.3.3 2.6.8 3.8 1.5a1.3 1.3 0 0 1 .6 1.6C22 24.4 19.8 26 17 26c-6.1 0-11-4.9-11-11 0-2.8 1.6-5 4.3-6.1a1.3 1.3 0 0 1 1.2.4Z"
                fill="currentColor"
              />
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </div>
          <div className="support-copy">
            <span>Need help? Call us</span>
            <strong>1-800-222-8888</strong>
          </div>
        </div>

        <div className="support-item support-affiliate">
          <div className="support-icon" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <path
                d="M10 18.5h16M12.5 22.5l-2.5-4 2.5-4m11 8 2.5-4-2.5-4M18 8v20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="18"
                cy="18"
                r="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </div>
          <div className="support-copy">
            <span>Join Soulea Affiliate</span>
            <strong>Program Today !</strong>
          </div>
        </div>

        <div className="support-item support-message">
          <div className="support-icon" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <path
                d="M8 11.5A3.5 3.5 0 0 1 11.5 8h13A3.5 3.5 0 0 1 28 11.5v9A3.5 3.5 0 0 1 24.5 24H17l-6 5v-5.5H11.5A3.5 3.5 0 0 1 8 20.5v-9Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14h12M12 18h8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="support-copy">
            <span>Send us a message</span>
            <strong>
              Contact our agents about your booking, and we&apos;ll reply as
              soon as possible.
            </strong>
          </div>
        </div>
      </div>

      <div className="footer-meta">
        <p>© 2024 Travila Inc. All rights reserved.</p>

        <div className="footer-socials" aria-label="Social media links">
          <span>Follow us</span>
          {footerSocialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="social-link"
            >
              <SocialIcon type={link.type} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
