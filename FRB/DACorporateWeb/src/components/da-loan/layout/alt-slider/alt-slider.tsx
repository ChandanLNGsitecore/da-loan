"use client";

import { OfferSlider } from "components/da-loan/blocks/offer-slider";
import { useState } from "react";

export default function AltSliderPage() {
  const offerAmount = 10000;
  const [requestedAmount, setRequestedAmount] = useState(8000);

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Alt Slider
        </h1>
        <OfferSlider
          requestedAmount={requestedAmount}
          offerAmount={offerAmount}
          min={0}
          max={20000}
          step={500}
          onRequestedChange={setRequestedAmount}
        />
      </div>
    </main>
  );
}
