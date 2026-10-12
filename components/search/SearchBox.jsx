"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./SearchBox.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

const getStartOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getInitialDate = () => getStartOfDay(new Date());
const today = getInitialDate();

const DEFAULT_GUEST_COUNTS = {
  adults: 0,
  children: 0,
  rooms: 0,
};

const childAgeOptions = Array.from({ length: 18 }, (_, index) => index);

const guestOptions = [
  ["adults", "Adults"],
  ["rooms", "Rooms"],
  ["children", "Children"],
];

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const withStopPropagation = (handler) => (event) => {
  event.stopPropagation();
  handler();
};

export function SearchBox({
  initialLocation = "Spain",
  initialCheckIn = null,
  initialCheckOut = null,
  initialGuestCounts = DEFAULT_GUEST_COUNTS,
  onSubmit,
}) {
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [calendarOpen, setCalendarOpen] = useState(null);
  const [guestOpen, setGuestOpen] = useState(false);
  const [month, setMonth] = useState(today);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [guestCounts, setGuestCounts] = useState(initialGuestCounts);
  const [childAges, setChildAges] = useState([]);
  const [guestValidationError, setGuestValidationError] = useState("");
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (!calendarOpen && !guestOpen) return;

    const handlePointerDown = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setCalendarOpen(null);
        setGuestOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [calendarOpen, guestOpen]);

  const openCalendar = (type) => {
    setCalendarOpen(calendarOpen === type ? null : type);

    const selected = type === "checkIn" ? checkIn ?? today : checkOut ?? checkIn ?? today;
    setMonth(startOfMonth(selected));
  };

  const handleDateSelection = (value) => {
    if (!value || !value.from) return;

    const nextDate = getStartOfDay(value.from);
    if (nextDate < today) return;

    if (!checkIn || checkOut || nextDate < checkIn) {
      setCheckIn(nextDate);
      setCheckOut(null);
      setHoveredDate(nextDate);
      setMonth(startOfMonth(nextDate));
      return;
    }

    setCheckOut(nextDate);
    setHoveredDate(null);
    setCalendarOpen(null);
  };

  const selectedValue = useMemo(() => {
    if (!checkIn) return undefined;

    const effectiveTo = checkOut ?? (hoveredDate && hoveredDate >= checkIn ? hoveredDate : undefined);

    return {
      from: checkIn,
      to: effectiveTo,
    };
  }, [checkIn, checkOut, hoveredDate]);

  const guestSummary = `${guestCounts.adults} ${guestCounts.adults === 1 ? "adult" : "adults"} • ${guestCounts.children} ${guestCounts.children === 1 ? "child" : "children"} • ${guestCounts.rooms} ${guestCounts.rooms === 1 ? "room" : "rooms"}`;

  const updateGuestCount = (key, delta) => {
    const nextValue = Math.max(0, guestCounts[key] + delta);
    setGuestCounts({ ...guestCounts, [key]: nextValue });

    if (key === "children") {
      setChildAges((ages) => Array.from({ length: nextValue }, (_, index) => ages[index] ?? null));
    }
  };

  const handleChildAgeChange = (index, age) => {
    setChildAges((current) => {
      const nextAges = [...current];
      nextAges[index] = age;
      return nextAges;
    });
    setGuestValidationError("");
  };

  const handleGuestDone = () => {
    const requiredChildren = guestCounts.children;
    const invalidChildren = childAges
      .slice(0, requiredChildren)
      .some((age) => age === null || age === undefined);

    if (requiredChildren > 0 && invalidChildren) {
      setGuestValidationError("Please select ages for all children before continuing.");
      return;
    }

    setGuestValidationError("");
    setGuestOpen(false);
  };

  const handleGuestCancel = () => {
    setGuestValidationError("");
    setGuestOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({ location, checkIn, checkOut, guestCounts });
  };

  return (
    <form
      ref={searchBoxRef}
      className="search-box"
      onSubmit={handleSubmit}
    >
      <div className="search-fields">
        <label className="search-field location-field">
          <span className="field-label">Location</span>
          <div className="search-value">
            <Image src="/location.png" alt="" className="field-icon" width={12} height={16} unoptimized loading="eager" />
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              aria-label="Location"
            />
            <span className="field-chevron" aria-hidden="true" />
          </div>
        </label>

        <label
          className="search-field date-field"
          onClick={() => openCalendar("checkIn")}
        >
          <span className="field-label">Check In</span>
          <div className="search-value">
            <Image src="/calendar.png" alt="" className="field-icon" width={16} height={16} unoptimized loading="eager" />
            <span className="date-display">{checkIn ? formatDate(checkIn) : "Select date"}</span>
            <span className="field-chevron" aria-hidden="true" />
          </div>
        </label>

        <label
          className="search-field date-field"
          onClick={() => openCalendar("checkOut")}
        >
          <span className="field-label">Check Out</span>
          <div className="search-value">
            <Image src="/calendar.png" alt="" className="field-icon" width={16} height={16} unoptimized loading="eager" />
            <span className="date-display">{checkOut ? formatDate(checkOut) : "Select date"}</span>
            <span className="field-chevron" aria-hidden="true" />
          </div>
        </label>

        <label
          className="search-field guest-field"
          onClick={(event) => {
            const target = event.target;
            if (target.closest(".guest-popover")) {
              event.stopPropagation();
              return;
            }
            setGuestOpen((open) => !open);
          }}
        >
          <span className="field-label">Guest</span>
          <div className="search-value">
            <svg className="field-icon guest-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="7" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M17 9.5a2.5 2.5 0 1 1 0-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M18.5 14.5c1.2.8 2 2 2 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span className="date-display guest-display">{guestSummary}</span>
            <span className="field-chevron" aria-hidden="true" />
          </div>

          {guestOpen && (
            <div
              className="guest-popover"
              role="dialog"
              aria-label="Guest selection"
              onClick={(event) => event.stopPropagation()}
            >
              {guestOptions.map(([key, label]) => (
                <div className="guest-option" key={key}>
                  <span>{label}</span>
                  <div className="guest-stepper">
                    <button type="button" onClick={withStopPropagation(() => updateGuestCount(key, -1))} aria-label={`Decrease ${key}`}>-</button>
                    <span>{guestCounts[key]}</span>
                    <button type="button" onClick={withStopPropagation(() => updateGuestCount(key, 1))} aria-label={`Increase ${key}`}>+</button>
                  </div>
                </div>
              ))}

              {guestCounts.children > 0 && (
                <div className="child-age-list">
                  {Array.from({ length: guestCounts.children }, (_, index) => (
                    <div className="child-age-row" key={`child-age-${index}`}>
                      <label htmlFor={`child-age-${index}`} className="child-age-label">
                        Age of child {index + 1}
                      </label>

                      <div className="child-age-select-wrap">
                        <select
                          id={`child-age-${index}`}
                          className="child-age-select"
                          value={childAges[index] ?? ""}
                          onChange={(event) => {
                            const nextAge = event.target.value === "" ? null : Number(event.target.value);
                            handleChildAgeChange(index, nextAge ?? 0);
                          }}
                          aria-label={`Age of child ${index + 1}`}
                        >
                          <option value="">Select age</option>
                          {childAgeOptions.map((age) => (
                            <option key={`${index}-${age}`} value={age}>
                              {age} {age === 1 ? "year" : "years"}
                            </option>
                          ))}
                        </select>
                        <span className="child-age-arrow" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {guestValidationError && (
                <div className="guest-validation" role="alert">
                  {guestValidationError}
                </div>
              )}

              <div className="guest-actions">
                <button type="button" className="guest-cancel" onClick={withStopPropagation(handleGuestCancel)}>
                  Cancel
                </button>
                <button type="button" className="guest-done" onClick={withStopPropagation(handleGuestDone)}>
                  Done
                </button>
              </div>
            </div>
          )}
        </label>

        <button type="submit" className="search-button" aria-label="Search">
          <Image src="/search.png" alt="" className="search-button-icon" width={20} height={20} unoptimized loading="eager" />
        </button>
      </div>

      {calendarOpen && (
        <div className="calendar-popover" role="dialog" aria-label="Calendar picker">
          <div className="calendar-inner">
            <DayPicker
              month={month}
              onMonthChange={setMonth}
              mode="range"
              selected={selectedValue}
              onSelect={handleDateSelection}
              onDayMouseEnter={(date) => {
                if (checkIn && !checkOut && date >= checkIn && date >= today) {
                  setHoveredDate(date);
                }
              }}
              onDayMouseLeave={() => {
                if (checkIn && !checkOut) {
                  setHoveredDate(null);
                }
              }}
              numberOfMonths={2}
              pagedNavigation
              showOutsideDays={false}
              fixedWeeks={false}
              className="calendar-picker"
              startMonth={today}
              disabled={{ before: today }}
            />
          </div>
        </div>
      )}
    </form>
  );
}
