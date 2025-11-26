"use client";
import React, { useState } from "react";
import "@/components/component_stylesheets/contact-form.css";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-form-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="font-pixel text-3xl text-yurika-cyan mb-2">
            GET IN TOUCH
          </h2>
          <p className="font-mono text-sm text-yurika-text-muted">
            Let&apos;s talk about building the future together
          </p>
        </div>

        {/* Form */}
        <div className="modal-body">
          {submitStatus === "success" ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3 className="font-pixel text-2xl text-yurika-electric mb-2">
                MESSAGE SENT!
              </h3>
              <p className="font-mono text-sm text-yurika-text-muted">
                We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name field */}
              <div className="form-field">
                <label htmlFor="name" className="form-label font-pixel">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input font-mono"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email field */}
              <div className="form-field">
                <label htmlFor="email" className="form-label font-pixel">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input font-mono"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject field */}
              <div className="form-field">
                <label htmlFor="subject" className="form-label font-pixel">
                  SUBJECT
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-select font-mono"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="creator">Creator Support</option>
                  <option value="sponsor">Sponsorship</option>
                  <option value="technical">Technical Support</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message field */}
              <div className="form-field">
                <label htmlFor="message" className="form-label font-pixel">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="form-textarea font-mono"
                  placeholder="Tell us what&apos;s on your mind..."
                />
                <div className="char-count font-mono text-xs text-yurika-text-muted">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Error message */}
              {submitStatus === "error" && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span className="font-mono text-sm">
                    Something went wrong. Please try again.
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                <span className="button-glow" />
                <span className="button-text font-pixel">
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </span>
                <span className="button-icon">
                  {isSubmitting ? "⏳" : "→"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
