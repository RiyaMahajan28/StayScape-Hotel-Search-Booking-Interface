"use client";

import { useState } from "react";
import "./AuthModal.css";

const EMPTY_OTP = ["", "", "", ""];

// Generate a random 4-digit OTP
const generateOTP = () => {
  return String(Math.floor(Math.random() * 9000) + 1000);
};

// Simulate sending OTP via SMS (in production, call your backend API)
const sendOTPToPhone = (phone, otp) => {
  return new Promise((resolve) => {
    // In production, this would be an API call to your backend
    // Backend would then send SMS via Twilio, AWS SNS, etc.
    setTimeout(() => {
      console.log(`OTP sent to +91${phone}: ${otp}`);
      // Store OTP in sessionStorage for verification
      if (typeof window !== "undefined") {
        sessionStorage.setItem(`otp_${phone}`, otp);
        sessionStorage.setItem(`otp_timestamp_${phone}`, Date.now().toString());
      }
      resolve(true);
    }, 1000);
  });
};

export function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(EMPTY_OTP);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
      setError("");
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsLoading(true);

    try {
      const newOTP = generateOTP();

      // Send OTP to phone (simulated)
      const sent = await sendOTPToPhone(phone, newOTP);

      if (sent) {
        setOtpSent(true);
        setError("");
        // Show success message temporarily
        setTimeout(() => {
          setStep("otp");
          setIsLoading(false);
        }, 500);
      } else {
        setError("Failed to send OTP. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const numValue = value.replace(/\D/g, "");
    if (numValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numValue;
      setOtp(newOtp);
      setError("");
      // Auto-focus next input
      if (numValue && index < 3) {
        const nextInput = document.querySelector(
          `input[data-otp-index="${index + 1}"]`,
        );
        nextInput?.focus();
      }
    }
  };

  const handleOtpBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-otp-index="${index - 1}"]`,
      );
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }
    setIsLoading(true);

    try {
      // Verify OTP
      const storedOTP = sessionStorage.getItem(`otp_${phone}`);
      const otpTimestamp = sessionStorage.getItem(`otp_timestamp_${phone}`);

      // Check if OTP matches
      if (storedOTP === otpString) {
        // Check if OTP is not expired (valid for 10 minutes)
        const isExpired =
          otpTimestamp && Date.now() - parseInt(otpTimestamp) > 10 * 60 * 1000;

        if (!isExpired) {
          // OTP is valid
          setTimeout(() => {
            setStep("success");
            setIsLoading(false);
            // Clear OTP after successful verification
            sessionStorage.removeItem(`otp_${phone}`);
            sessionStorage.removeItem(`otp_timestamp_${phone}`);
          }, 1000);
        } else {
          setError("OTP has expired. Please request a new one.");
          setIsLoading(false);
        }
      } else {
        setError("Invalid OTP. Please check and try again.");
        setIsLoading(false);
      }
    } catch {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    // Reset and close
    setStep("phone");
    setPhone("");
    setOtp(EMPTY_OTP);
    setError("");
    setOtpSent(false);
    onClose();
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const newOTP = generateOTP();
      const sent = await sendOTPToPhone(phone, newOTP);
      if (sent) {
        setOtp(EMPTY_OTP);
        setError("OTP resent successfully!");
        setTimeout(() => setError(""), 3000);
        setIsLoading(false);
      }
    } catch {
      setError("Failed to resend OTP. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {step === "phone" && (
          <div className="auth-modal-content auth-phone-step">
            <div className="auth-header">
              <h2>Welcome to Soulea</h2>
              <p>Sign in to your account</p>
            </div>

            {otpSent && (
              <div className="otp-success-banner">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>OTP sent successfully to +91 {phone}</span>
              </div>
            )}

            <form onSubmit={handlePhoneSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <div className="phone-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isLoading}
                    maxLength={10}
                  />
                </div>
                {error && <span className="error-message">{error}</span>}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading || phone.length !== 10}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="auth-modal-content auth-otp-step">
            <button
              className="auth-back-btn"
              onClick={() => setStep("phone")}
              aria-label="Back"
            >
              ← Back
            </button>

            <div className="auth-header">
              <h2>Verify OTP</h2>
              <p>Enter the 4-digit OTP sent to +91 {phone}</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="auth-form">
              <div className="form-group">
                <label>Enter OTP</label>
                <div className="otp-inputs">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpBackspace(index, e)}
                      disabled={isLoading}
                      maxLength={1}
                      data-otp-index={index}
                      className="otp-input"
                    />
                  ))}
                </div>
                {error && <span className="error-message">{error}</span>}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading || otp.join("").length !== 4}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="auth-resend">
              <p>
                Didn&apos;t receive OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="auth-resend-btn"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="auth-modal-content auth-success-step">
            <div className="success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="#10B981" />
                <path
                  d="M27 38L22 33M27 38L42 22"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="auth-header">
              <h2>Welcome to Soulea!</h2>
              <p>Your account has been successfully created</p>
            </div>

            <div className="success-details">
              <p className="success-phone">+91 {phone}</p>
              <p className="success-message">
                You can now book hostels, save your favorites, and access
                exclusive deals.
              </p>
            </div>

            <button
              onClick={handleSuccess}
              className="auth-submit-btn auth-success-btn"
            >
              Continue to Soulea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
