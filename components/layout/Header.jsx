"use client";

import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useTheme } from "@/components/providers/ThemeProvider";
import { headerHostelSuggestions } from "@/data/navigation";
import { ProfileDropdown } from "./ProfileDropdown";

const logos = {
  light: { src: "/soulea_logo.png", width: 298, height: 95 },
  dark: { src: "/logo_darkTheme.png", width: 122, height: 39 },
};

const toggleIcons = {
  light: { src: "/toggleButton_Light.png", width: 138, height: 64 },
  dark: { src: "/toggleButton_Dark.png", width: 132, height: 60 },
};

export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const matchingHostels = headerHostelSuggestions
    .filter((hostel) => hostel.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 3);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <Link href="/" className="brand" aria-label="Soulea home">
        <Image className="brand-logo" {...logos[theme]} alt="Soulea" loading="eager" />
      </Link>
      <nav className={menuOpen ? "is-open" : ""}>
        <Link href="/#explore" onClick={closeMenu}>
          Explore
        </Link>
        <Link href="/#hostels" onClick={closeMenu}>
          About us
        </Link>
        <Link href="#contact" onClick={closeMenu}>
          Contact us
        </Link>
        <Link href="/franchise" onClick={closeMenu}>
          Franchise
        </Link>
      </nav>
      <div className="top-actions">
        <Form
          action="/search"
          className="nav-search"
          onSubmit={(event) => {
            if (!searchQuery.trim()) event.preventDefault();
          }}
        >
          <input
            name="location"
            aria-label="Search hostels"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search hostel"
          />
          <button type="submit" aria-label="Submit hostel search">
            <i aria-hidden="true" />
          </button>
          {searchQuery && matchingHostels.length > 0 && (
            <div className="nav-search-results">
              {matchingHostels.map((hostel) => (
                <button
                  type="button"
                  key={hostel}
                  onClick={() => {
                    setSearchQuery(hostel);
                    router.push(`/search?location=${encodeURIComponent(hostel)}`);
                  }}
                >
                  {hostel}
                </button>
              ))}
            </div>
          )}
        </Form>
        <button
          className={`theme-toggle ${theme}`}
          type="button"
          aria-label="Toggle theme"
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <Image className="theme-toggle-icon" {...toggleIcons[theme]} alt="" loading="eager" />
        </button>
        <ProfileDropdown onLoginClick={() => setAuthModalOpen(true)} />
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
}
