"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Field } from "@/components/plp/Field";
import { ProgressStepper } from "@/components/plp/ProgressStepper";
import { SectionHeading } from "@/components/plp/SectionHeading";
import {
  initialListingForm,
  initialRooms,
  photoSlotLabels,
  plpAmenityOptions,
  progressSteps,
} from "@/data/plp";
import "./plp.css";

const MAX_PHOTOS = photoSlotLabels.length;
const isFilled = (value) => value.trim() !== "";

export default function PlpPage() {
  const [form, setForm] = useState(initialListingForm);
  const [touched, setTouched] = useState({});
  const [rooms, setRooms] = useState(initialRooms);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const totalCapacity = rooms.reduce((total, room) => total + room.count, 0);

  const updateField = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const handleFieldBlur = (key) => () =>
    setTouched((current) => ({ ...current, [key]: true }));
  const fieldError = (key) => {
    const shouldShow = touched[key] || submitted;
    return shouldShow && !isFilled(form[key]) ? "This field is required" : "";
  };
  const propertyTypeError = fieldError("propertyType");

  const updateRoom = (index, amount) =>
    setRooms((current) =>
      current.map((room, roomIndex) =>
        roomIndex === index
          ? { ...room, count: Math.max(0, room.count + amount) }
          : room,
      ),
    );
  const toggleAmenity = (amenity) =>
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );

  const handleUpload = (event) => {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
    event.target.value = "";
    if (!files.length) return;

    setPhotos((current) => [...current, ...files.map((file) => URL.createObjectURL(file))]);
  };
  const removePhoto = (index) => {
    URL.revokeObjectURL(photos[index]);
    setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index));
  };
  const removeAllPhotos = () => {
    photos.forEach((photoUrl) => URL.revokeObjectURL(photoUrl));
    setPhotos([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (event.currentTarget.checkValidity())
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepCompletion = [
    [form.propertyName, form.propertyType, form.city, form.region, form.address, form.pin].every(isFilled),
    totalCapacity > 0,
    amenities.length > 0,
    photos.length > 0,
    [form.price, form.name, form.phone, form.email].every(isFilled),
    false,
  ];
  const activeStep = stepCompletion.findIndex((stepIsComplete) => !stepIsComplete);
  const currentStep = activeStep === -1 ? progressSteps.length - 1 : activeStep;

  return (
    <main className="plp-page">
      <Header />
      <section className="plp-hero">
        <div className="plp-hero-copy">
          <span className="plp-eyebrow">◈ &nbsp; MAXIMIZE YOUR EARNINGS</span>
          <h1>
            List your property,
            <br />
            keep <em>100%</em> of your revenue
          </h1>
          <p>
            Add your hostel or private rooms to Soulea. Zero commission, full
            control, unlimited bookings.
          </p>
          <div className="plp-hero-points">
            <span>
              ◉ <b>Zero Commission</b>
              <small>
                Keep 100%
                <br />
                of your earnings
              </small>
            </span>
            <span>
              ☷ <b>Full Control</b>
              <small>
                Manage your property
                <br />
                your way
              </small>
            </span>
            <span>
              ▣ <b>Unlimited Bookings</b>
              <small>
                No limits. More bookings,
                <br />
                more revenue
              </small>
            </span>
          </div>
          <Link className="plp-hero-button" href="#basic-information">
            ✦ &nbsp; Start Listing on Soulea
          </Link>
        </div>
        <div className="plp-hero-art">
          <Image
            src="/franchise_building1.png"
            alt="Soulea property"
            width={600}
            height={372}
            preload
          />
          <div className="plp-earnings-card">
            <small>Your Earnings</small>
            <strong>100%</strong>
            <span>No Commission</span>
            <b>▣</b>
          </div>
          <div className="plp-bookings-card">
            <small>
              Bookings
              <br />
              This Month
            </small>
            <strong>↗ 32%</strong>
            <i />
          </div>
        </div>
      </section>
      <ProgressStepper
        steps={progressSteps}
        stepCompletion={stepCompletion}
        activeStep={currentStep}
      />
      <form className="plp-layout" onSubmit={handleSubmit}>
        <div className="plp-main-column">
          <section className="plp-card" id="basic-information">
            <SectionHeading
              title="Basic information"
              subtitle="Tell us about your property"
            />
            <div className="plp-fields-stack">
              <Field
                label="Property Name"
                placeholder="e.g. The Wavecrest Hostel"
                value={form.propertyName}
                onChange={updateField("propertyName")}
                onBlur={handleFieldBlur("propertyName")}
                required
                error={fieldError("propertyName")}
              />
              <label className="plp-field">
                <span>
                  Property type<b>*</b>
                </span>
                <select
                  value={form.propertyType}
                  onChange={updateField("propertyType")}
                  onBlur={handleFieldBlur("propertyType")}
                  required
                  aria-invalid={Boolean(propertyTypeError)}
                >
                  <option value="">eg - hostel</option>
                  <option>Hostel</option>
                  <option>Private rooms</option>
                  <option>Hotel</option>
                </select>
                {propertyTypeError && (
                  <small className="plp-field-error">{propertyTypeError}</small>
                )}
              </label>
              <label className="plp-field">
                <span>Description</span>
                <textarea
                  placeholder="Describe your property – vibe, location, what makes it special..."
                  value={form.description}
                  onChange={updateField("description")}
                />
                <small className="plp-counter">
                  {form.description.length}/500
                </small>
              </label>
              <div className="plp-two-col">
                <Field
                  label="City"
                  placeholder="e.g. Goa"
                  value={form.city}
                  onChange={updateField("city")}
                  onBlur={handleFieldBlur("city")}
                  required
                  error={fieldError("city")}
                />
                <Field
                  label="State / Region"
                  placeholder="e.g. India"
                  value={form.region}
                  onChange={updateField("region")}
                  onBlur={handleFieldBlur("region")}
                  required
                  error={fieldError("region")}
                />
              </div>
              <Field
                label="Full Address"
                placeholder="Street address, landmark"
                value={form.address}
                onChange={updateField("address")}
                onBlur={handleFieldBlur("address")}
                required
                error={fieldError("address")}
              />
              <div className="plp-two-col">
                <Field
                  label="Pin Code"
                  placeholder="403001"
                  value={form.pin}
                  onChange={updateField("pin")}
                  onBlur={handleFieldBlur("pin")}
                  required
                  error={fieldError("pin")}
                />
                <Field
                  label="Google Maps Link"
                  placeholder="Paste maps.google.com link"
                  value={form.maps}
                  onChange={updateField("maps")}
                  onBlur={handleFieldBlur("maps")}
                />
              </div>
            </div>
          </section>
          <section className="plp-card plp-rooms">
            <SectionHeading
              title="Rooms & beds"
              subtitle="Set your capacity & room types"
            />
            {rooms.map((room, index) => (
              <div className="plp-room-row" key={room.name}>
                <span className="plp-room-info">
                  <i>{room.icon}</i>
                  <strong>{room.name}</strong>
                  <small>{room.description}</small>
                </span>
                <span className="plp-quantity">
                  <button
                    type="button"
                    onClick={() => updateRoom(index, -1)}
                    aria-label={`Decrease ${room.name}`}
                  >
                    −
                  </button>
                  <b>{room.count}</b>
                  <button
                    type="button"
                    onClick={() => updateRoom(index, 1)}
                    aria-label={`Increase ${room.name}`}
                  >
                    +
                  </button>
                  <small>{room.unit}</small>
                </span>
              </div>
            ))}
            <div className="plp-total">
              <b>⌂ &nbsp; Total capacity</b>
              <strong>{totalCapacity} guests</strong>
            </div>
          </section>
          <section className="plp-card plp-amenities">
            <SectionHeading
              title="Amenities"
              subtitle="Select all that apply — guests filter by these"
            />
            <div className="plp-amenity-grid">
              {plpAmenityOptions.map((amenity, index) => (
                <button
                  type="button"
                  className={`plp-amenity ${amenities.includes(amenity) ? "is-selected" : ""}`}
                  key={`${amenity}-${index}`}
                  onClick={() => toggleAmenity(amenity)}
                >
                  <span>{amenities.includes(amenity) ? "✓" : "□"}</span>
                  {amenity}
                </button>
              ))}
            </div>
            <button type="button" className="plp-add-amenity">
              ＋ Add custom amenity
            </button>
          </section>
          <section className="plp-card plp-photos">
            <SectionHeading
              title="Property photos"
              subtitle="Add at least 5 photos — hero, rooms, common areas"
            />
            <label className="plp-upload">
              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleUpload}
              />
              <strong>＋</strong>
              <b>Drag photos here or click to upload</b>
              <span>JPG, PNG up to 10MB each • Min 1200×900 recommended</span>
            </label>
            <div className="plp-thumbnails">
              {Array.from({ length: MAX_PHOTOS }, (_, index) => {
                const photoUrl = photos[index];
                if (photoUrl) {
                  return (
                    <div
                      className="plp-thumb has-photo"
                      key={`${photoUrl}-${index}`}
                    >
                      <Image
                        src={photoUrl}
                        alt={`Uploaded property ${index + 1}`}
                        width={160}
                        height={120}
                        unoptimized
                      />
                      <button type="button" onClick={() => removePhoto(index)}>
                        ×
                      </button>
                    </div>
                  );
                }
                return (
                  <div className="plp-thumb" key={`placeholder-${index}`}>
                    <strong>＋</strong>
                    <b>{photoSlotLabels[index]}</b>
                    <span>Add photo</span>
                  </div>
                );
              })}
            </div>
            {photos.length > 0 && (
              <button
                type="button"
                className="plp-delete"
                onClick={removeAllPhotos}
              >
                Delete all photos
              </button>
            )}
          </section>
          <section className="plp-card plp-contact">
            <SectionHeading
              title="Pricing Contact & verification"
              subtitle="Set your pricing, availability and share your contact details for verification"
            />
            <h3>Pricing details</h3>
            <div className="plp-three-col">
              <Field
                label="Price per night (USD)"
                placeholder="$500"
                value={form.price}
                onChange={updateField("price")}
                onBlur={handleFieldBlur("price")}
                required
                error={fieldError("price")}
              />
              <Field
                label="Minimum Stay"
                placeholder="1 night"
                value={form.stay}
                onChange={updateField("stay")}
                onBlur={handleFieldBlur("stay")}
              />
              <Field
                label="Availability"
                placeholder="Available now"
                value={form.availability}
                onChange={updateField("availability")}
                onBlur={handleFieldBlur("availability")}
              />
            </div>
            <label className="plp-field">
              <span>Additional pricing info (optional)</span>
              <textarea
                placeholder="Eg long term discount"
                value={form.pricingInfo}
                onChange={updateField("pricingInfo")}
              />
            </label>
            <h3>Contact information</h3>
            <div className="plp-two-col">
              <Field
                label="Your Name"
                placeholder="Full name"
                value={form.name}
                onChange={updateField("name")}
                onBlur={handleFieldBlur("name")}
                required
                error={fieldError("name")}
              />
              <Field
                label="Phone Number"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={updateField("phone")}
                onBlur={handleFieldBlur("phone")}
                required
                error={fieldError("phone")}
              />
              <Field
                label="Email Address"
                placeholder="you@yourhostel.com"
                value={form.email}
                onChange={updateField("email")}
                onBlur={handleFieldBlur("email")}
                required
                error={fieldError("email")}
              />
              <Field
                label="GST Number (Optional)"
                placeholder="29AAAAA0000A1Z5"
                value={form.gst}
                onChange={updateField("gst")}
                onBlur={handleFieldBlur("gst")}
              />
            </div>
            <button className="plp-continue" type="submit">
              Continue Review & Publish
            </button>
            {submitted && (
              <p className="plp-form-status">
                Please complete the required fields before continuing.
              </p>
            )}
          </section>
          <div className="plp-draft-note">
            ⓘ &nbsp; You can save as draft and continue later. Your progress is
            always saved. <button type="button">Save as draft</button>
          </div>
        </div>
        <aside className="plp-sidebar">
          <div className="plp-summary plp-card">
            <SectionHeading
              title="Listing summary"
              subtitle="Preview of your property"
            />
            <Image
              className="plp-summary-image"
              src="/franchise_building1.png"
              alt="Property preview"
              width={600}
              height={372}
            />
            <h3>The Wavecrest Hostel</h3>
            <p className="plp-location">⌖ &nbsp; Goa, India</p>
            <div className="plp-summary-stats">
              <span>♧ 0 Rooms</span>
              <span>♙ 0 Guests</span>
            </div>
            <div className="plp-summary-line">
              <b>Amenities</b>
              <span>{amenities.length} selected</span>
            </div>
            <div className="plp-summary-icons">
              {amenities.slice(0, 4).map((item) => (
                <span key={item}>◉</span>
              ))}
              <span>+{Math.max(0, amenities.length - 4)}</span>
            </div>
            <div className="plp-summary-line">
              <b>Pricing</b>
            </div>
            <div className="plp-price">
              <strong>₹0</strong> / night
            </div>
            <p className="plp-green">You keep 100% of your revenue</p>
            <div className="plp-zero">
              <strong>✦</strong>
              <span>
                <b>Zero Commission</b>
                <small>You pay nothing. Ever.</small>
              </span>
            </div>
          </div>
          <div className="plp-help plp-card">
            <strong>?</strong>
            <h3>Need help listing your property?</h3>
            <p>Our team is here to help you.</p>
            <button type="button">Contact Support</button>
          </div>
        </aside>
      </form>
      <Footer />
    </main>
  );
}
