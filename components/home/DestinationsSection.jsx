"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { destinations, regionTabs } from "@/data/home";
import { unsplashPhoto } from "@/lib/images";

export function DestinationsSection() {
  const [activeRegion, setActiveRegion] = useState("trending");

  return (
    <section className="site-section" id="explore">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Explore the world</p>
          <h2>Popular Destinations</h2>
          <p>Explore cities with verified hostels and transparent pricing</p>
        </div>
        <div className="segmented">
          {regionTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeRegion === tab.id ? "active" : ""}
              onClick={() => setActiveRegion(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="destination-grid">
        {destinations[activeRegion].map(({ name, country, image }) => (
          <Link className="destination" href="#hostels" key={`${activeRegion}-${name}`}>
            <Image src={unsplashPhoto(image, 500)} alt={name} width={500} height={333} />
            <span>{name}</span>
            <small>Country, {country}</small>
            <small>
              From $12 / night <b>›</b>
            </small>
          </Link>
        ))}
        <Link className="explore-card" href="#hostels">
          <strong>
            Explore more
            <br />
            destinations
          </strong>
          <span>
            Browse
            <br />
            All destinations <b>›</b>
          </span>
        </Link>
      </div>
    </section>
  );
}
