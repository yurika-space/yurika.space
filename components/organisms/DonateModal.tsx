"use client";
import React, { useState } from "react";
import "@/components/component_stylesheets/donate-modal.css";

interface DonateModalProps {
  onClose: () => void;
}

const QUICK_AMOUNTS = [5, 10, 25, 50, 100, 250, 500, 1000];

export default function DonateModal({ onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "crypto">("stripe");
  const [cryptoCurrency, setCryptoCurrency] = useState<"SOL" | "USDT">("SOL");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : Math.min(parsed, 1000);
    }
    return selectedAmount || 0;
  };

  const handleDonate = () => {
    const amount = getFinalAmount();
    
    if (amount === 0) {
      alert("Please select or enter a donation amount");
      return;
    }

    if (paymentMethod === "stripe") {
      // Integrate Stripe payment
      console.log(`Processing Stripe payment for $${amount}`);
      // TODO: Implement Stripe Checkout
      // stripe.redirectToCheckout({ sessionId: ... })
    } else {
      // Process cryptocurrency payment
      console.log(`Processing ${cryptoCurrency} payment for $${amount}`);
      // TODO: Implement Solana Blinks or wallet connection
    }
  };

  const handleRequestPitchDeck = () => {
    // Redirect to pitch deck request
    console.log("Requesting pitch deck for amounts over $1000");
    window.location.href = "/request-pitch-deck";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="donate-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="font-pixel text-3xl text-yurika-electric mb-2">
            POWER UP
          </h2>
          <p className="font-mono text-sm text-yurika-text-muted">
            Support independent creators building the future
          </p>
        </div>

        {/* Amount selection */}
        <div className="modal-body">
          <div className="amount-section mb-6">
            <label className="font-pixel text-sm text-yurika-text-primary mb-3 block">
              SELECT AMOUNT
            </label>
            
            <div className="amount-grid">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  <span className="amount-currency">$</span>
                  <span className="amount-value">{amount}</span>
                </button>
              ))}
            </div>

            <div className="custom-amount-wrapper mt-4">
              <label className="font-pixel text-xs text-yurika-text-muted mb-2 block">
                OR CUSTOM AMOUNT
              </label>
              <div className="custom-amount-input">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter amount"
                  className="font-mono"
                />
              </div>
              <p className="font-mono text-xs text-yurika-text-muted mt-2">
                Max donation: $1,000 • For larger amounts, request our pitch deck
              </p>
            </div>
          </div>

          {/* Payment method selection */}
          <div className="payment-method-section mb-6">
            <label className="font-pixel text-sm text-yurika-text-primary mb-3 block">
              PAYMENT METHOD
            </label>
            
            <div className="payment-tabs">
              <button
                className={`payment-tab ${paymentMethod === 'stripe' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('stripe')}
              >
                <span className="tab-icon">💳</span>
                <span className="tab-text">Card / Bank</span>
              </button>
              
              <button
                className={`payment-tab ${paymentMethod === 'crypto' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('crypto')}
              >
                <span className="tab-icon">🪙</span>
                <span className="tab-text">Cryptocurrency</span>
              </button>
            </div>

            {/* Crypto currency selection */}
            {paymentMethod === 'crypto' && (
              <div className="crypto-options mt-4">
                <label className="font-pixel text-xs text-yurika-text-muted mb-2 block">
                  SELECT CRYPTOCURRENCY
                </label>
                <div className="crypto-tabs">
                  <button
                    className={`crypto-tab ${cryptoCurrency === 'SOL' ? 'active' : ''}`}
                    onClick={() => setCryptoCurrency('SOL')}
                  >
                    <span className="crypto-symbol">◎</span>
                    <span className="crypto-name">SOL</span>
                  </button>
                  
                  <button
                    className={`crypto-tab ${cryptoCurrency === 'USDT' ? 'active' : ''}`}
                    onClick={() => setCryptoCurrency('USDT')}
                  >
                    <span className="crypto-symbol">₮</span>
                    <span className="crypto-name">USDT (SOL)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Donation summary */}
          <div className="donation-summary mb-6">
            <div className="summary-row">
              <span className="font-mono text-sm text-yurika-text-muted">Amount:</span>
              <span className="font-pixel text-lg text-yurika-electric">
                ${getFinalAmount().toFixed(2)}
              </span>
            </div>
            {paymentMethod === 'crypto' && (
              <div className="summary-row">
                <span className="font-mono text-sm text-yurika-text-muted">Currency:</span>
                <span className="font-pixel text-lg text-yurika-cyan">
                  {cryptoCurrency}
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="modal-actions">
            <button 
              className="donate-button primary"
              onClick={handleDonate}
              disabled={getFinalAmount() === 0}
            >
              <span className="button-glow" />
              <span className="button-text font-pixel">
                {paymentMethod === 'stripe' ? 'Donate Now' : `Pay with ${cryptoCurrency}`}
              </span>
              <span className="button-icon">→</span>
            </button>

            <button 
              className="donate-button secondary"
              onClick={handleRequestPitchDeck}
            >
              <span className="button-text font-pixel">Request Pitch Deck</span>
              <span className="button-icon">📄</span>
            </button>
          </div>

          {/* Stripe/Blinks info */}
          <div className="payment-info">
            <p className="font-mono text-xs text-yurika-text-muted text-center">
              {paymentMethod === 'stripe' ? (
                <>
                  💳 Secure payments powered by <strong>Stripe</strong>
                </>
              ) : (
                <>
                  🪙 Powered by <strong>Solana Blinks</strong> for instant crypto payments
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
